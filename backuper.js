const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_PATH = 'C:\\Users\\hypec\\.callsybacks';
const IGNORED_DIRS = ['node_modules', '.git', '.next', 'build', 'dist'];
const STATIC_EXTENSIONS = ['.html', '.css', '.scss', '.sass', '.less', '.svg', '.txt', '.md'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.ico', '.svg'];

const ORDERED_PREFIXES = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth',
    'twentyfirst', 'twentysecond', 'twentythird', 'twentyfourth', 'twentyfifth', 'twentysixth', 'twentyseventh', 'twentyeighth', 'twentyninth', 'thirtieth',
    'thirtyfirst', 'thirtysecond', 'thirtythird', 'thirtyfourth', 'thirtyfifth', 'thirtysixth', 'thirtyseventh', 'thirtyeighth', 'thirtyninth', 'fortieth',
    'fortyfirst', 'fortysecond', 'fortythird', 'fortyfourth', 'fortyfifth', 'fortysixth', 'fortyseventh', 'fortyeighth', 'fortyninth', 'fiftieth',
    'fiftyfirst', 'fiftysecond', 'fiftythird', 'fiftyfourth', 'fiftyfifth', 'fiftysixth', 'fiftyseventh', 'fiftyeighth', 'fiftyninth', 'sixtieth',
    'sixtyfirst', 'sixtysecond', 'sixtythird', 'sixtyfourth', 'sixtyfifth', 'sixtysixth', 'sixtyseventh', 'sixtyeighth', 'sixtyninth', 'seventieth',
    'seventyfirst', 'seventysecond', 'seventythird', 'seventyfourth', 'seventyfifth', 'seventysixth', 'seventyseventh', 'seventyeighth', 'seventyninth', 'eightieth',
    'eightyfirst', 'eightysecond', 'eightythird', 'eightyfourth', 'eightyfifth', 'eightysixth', 'eightyseventh', 'eightyeighth', 'eightyninth', 'ninetieth',
    'ninetyfirst', 'ninetysecond', 'ninetythird', 'ninetyfourth', 'ninetyfifth', 'ninetysixth', 'ninetyseventh', 'ninetyeighth', 'ninetyninth', 'hundredth'
];

function ensureBackupDirectory() {
    if (!fs.existsSync(BACKUP_PATH)) {
        try {
            fs.mkdirSync(BACKUP_PATH, { recursive: true });
            console.log(`Backup directory created: ${BACKUP_PATH}`);
        } catch (error) {
            console.error(`Failed to create backup directory: ${BACKUP_PATH}`);
            console.error('Error:', error.message);
            process.exit(1);
        }
    }
}

function checkProjectStructure() {
    const workingDir = process.cwd();
    const frontendExists = fs.existsSync(path.join(workingDir, 'frontend'));
    const backendExists = fs.existsSync(path.join(workingDir, 'backend'));

    return {
        hasFrontendBackend: frontendExists || backendExists,
        workingDir
    };
}

function getCurrentDateTime() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
}

function getNextBackupPrefix() {
    const existingBackups = fs.readdirSync(BACKUP_PATH)
        .filter(dir => ORDERED_PREFIXES.some(prefix => dir.startsWith(prefix)));

    if (existingBackups.length === 0) {
        return ORDERED_PREFIXES[0];
    }

    const currentPrefixes = existingBackups.map(dir => {
        const prefix = ORDERED_PREFIXES.find(p => dir.startsWith(p));
        return prefix || '';
    });

    const lastUsedPrefix = currentPrefixes.reduce((a, b) => {
        const indexA = ORDERED_PREFIXES.indexOf(a);
        const indexB = ORDERED_PREFIXES.indexOf(b);
        return indexA > indexB ? a : b;
    }, ORDERED_PREFIXES[0]);

    const nextIndex = ORDERED_PREFIXES.indexOf(lastUsedPrefix) + 1;
    
    if (nextIndex >= ORDERED_PREFIXES.length) {
        console.error('ERROR: Maximum number of backups reached!');
        console.error('Please clean up old backups.');
        process.exit(1);
    }

    return ORDERED_PREFIXES[nextIndex];
}

function createBackupDir() {
    const prefix = getNextBackupPrefix();
    const timestamp = getCurrentDateTime();
    const backupDir = path.join(BACKUP_PATH, `${prefix}-${timestamp}`);
    fs.mkdirSync(backupDir, { recursive: true });
    return backupDir;
}

function shouldIgnoreFile(filePath, mode) {
    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath);

    if (basename.startsWith('.') || IGNORED_DIRS.some(dir => filePath.includes(dir))) {
        return true;
    }

    switch (mode) {
        case '--static':
            return !STATIC_EXTENSIONS.includes(ext);
        case '--images':
            return !IMAGE_EXTENSIONS.includes(ext);
        case '--structure':
            return false;
        default:
            return false;
    }
}

function copyDirectory(source, destination, mode) {
    if (!fs.existsSync(source)) {
        console.error(`Source directory not found: ${source}`);
        return;
    }

    fs.mkdirSync(destination, { recursive: true });
    console.log(`Copying: ${source} -> ${destination}`);

    const items = fs.readdirSync(source);
    let copiedFiles = 0;

    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);

        if (shouldIgnoreFile(sourcePath, mode)) {
            return;
        }

        const stats = fs.statSync(sourcePath);

        if (stats.isDirectory()) {
            copyDirectory(sourcePath, destPath, mode);
        } else if (stats.isFile()) {
            if (mode === '--structure') {
                fs.writeFileSync(destPath, '');
            } else {
                fs.copyFileSync(sourcePath, destPath);
            }
            copiedFiles++;
        }
    });

    if (copiedFiles > 0) {
        console.log(`${copiedFiles} files copied: ${source}`);
    }
}

function backupProject(mode) {
    try {
        ensureBackupDirectory();
        const { hasFrontendBackend, workingDir } = checkProjectStructure();

        const backupDir = createBackupDir();
        console.log(`\nStarting backup...`);
        console.log(`Mode: ${mode}`);
        console.log(`Target directory: ${backupDir}\n`);
        
        if (hasFrontendBackend) {
            const frontendSrc = path.join(workingDir, 'frontend');
            const backendSrc = path.join(workingDir, 'backend');
            
            const frontendDest = path.join(backupDir, 'frontend');
            const backendDest = path.join(backupDir, 'backend');

            if (fs.existsSync(frontendSrc)) {
                copyDirectory(frontendSrc, frontendDest, mode);
            }
            if (fs.existsSync(backendSrc)) {
                copyDirectory(backendSrc, backendDest, mode);
            }
        } else {
            // Directly backup the working directory
            const projectName = path.basename(workingDir);
            const projectDest = path.join(backupDir, projectName);
            copyDirectory(workingDir, projectDest, mode);
        }

        console.log(`\nBackup completed successfully!`);
        console.log(`Backup location: ${backupDir}`);
    } catch (error) {
        console.error('\nError during backup:');
        console.error(error.message);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

if (args.length < 3 || args[0] !== 'clone' || args[1] !== 'pr') {
    console.error('ERROR: Invalid command usage!');
    console.error('Correct usage: node backuper.js clone pr [--system|--static|--structure|--images]');
    console.error('Example: node backuper.js clone pr --system');
    process.exit(1);
}

const mode = args[2];
const validModes = ['--system', '--static', '--structure', '--images'];

if (!validModes.includes(mode)) {
    console.error('ERROR: Invalid mode selection!');
    console.error('Available modes:', validModes.join(', '));
    console.error('Example: node backuper.js clone pr --system');
    process.exit(1);
}

backupProject(mode);