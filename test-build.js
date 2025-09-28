#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Test du build Angular local...\n');

try {
    // Test 1: Vérifier la structure du projet
    console.log('📋 Vérification de la structure du projet:');

    const frontendPath = path.join(__dirname, 'frontend');
    const angularJsonPath = path.join(frontendPath, 'angular.json');

    if (!fs.existsSync(angularJsonPath)) {
        throw new Error('❌ angular.json non trouvé');
    }

    const angularConfig = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));
    const outputPath = angularConfig.projects.frontend.architect.build.options.outputPath;
    console.log(`✅ OutputPath configuré: ${outputPath}`);

    // Test 2: Build du frontend
    console.log('\n🔨 Build du frontend Angular:');
    process.chdir(frontendPath);

    console.log('📦 Installation des dépendances...');
    execSync('npm ci', { stdio: 'inherit' });

    console.log('🏗️ Build de production...');
    execSync('npx ng build --configuration production', { stdio: 'inherit' });

    // Test 3: Vérification des fichiers générés
    console.log('\n📁 Vérification des fichiers générés:');

    const distPath = path.join(frontendPath, 'dist');
    console.log(`Contenu de ${distPath}:`);

    if (fs.existsSync(distPath)) {
        const distContents = fs.readdirSync(distPath);
        distContents.forEach(item => {
            const itemPath = path.join(distPath, item);
            const isDir = fs.statSync(itemPath).isDirectory();
            console.log(`  ${isDir ? '📁' : '📄'} ${item}`);

            if (isDir) {
                const subContents = fs.readdirSync(itemPath);
                subContents.forEach(subItem => {
                    console.log(`    📄 ${subItem}`);
                });
            }
        });
    } else {
        throw new Error('❌ Dossier dist/ non créé');
    }

    // Test 4: Vérifier index.html
    const possiblePaths = [
        path.join(distPath, 'cars-maintenance', 'index.html'),
        path.join(distPath, 'frontend', 'index.html'),
        path.join(distPath, 'index.html')
    ];

    let indexFound = false;
    for (const indexPath of possiblePaths) {
        if (fs.existsSync(indexPath)) {
            console.log(`✅ index.html trouvé: ${indexPath}`);
            indexFound = true;
            break;
        }
    }

    if (!indexFound) {
        console.log('❌ index.html non trouvé dans:');
        possiblePaths.forEach(p => console.log(`  - ${p}`));
        throw new Error('index.html manquant');
    }

    console.log('\n🎉 Build test réussi !');
    console.log('✅ Le build Angular fonctionne correctement');
    console.log('✅ Les fichiers sont générés au bon endroit');
    console.log('✅ Railway devrait fonctionner maintenant');

} catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
    process.exit(1);
}