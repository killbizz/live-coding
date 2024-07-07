function clearScene(scene) {
    while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);

        // Dispose of the object's resources
        if (object.geometry) object.geometry.dispose();

        if (object.material) {
            if (object.material.map) object.material.map.dispose();
            if (object.material.lightMap) object.material.lightMap.dispose();
            if (object.material.bumpMap) object.material.bumpMap.dispose();
            if (object.material.normalMap) object.material.normalMap.dispose();
            if (object.material.specularMap) object.material.specularMap.dispose();
            if (object.material.envMap) object.material.envMap.dispose();

            object.material.dispose();
        }

        if(object.isLight) object.dispose();
    }
    scene = new THREE.Scene();
}

// retrieves the entire model, including scenes, animations, cameras, ...
function getModel(modelFilePath) {
    loader = new THREE.GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(
        modelFilePath,
        (gltf) => {
            // console.log(gltf)
            resolve(gltf);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
            reject(error);
        }
        );
    });
}

// retrieves the geometry of the Mesh identified by meshName
// if meshName is undefined returns the geometry of the first Mesh inside the model
async function getModelGeometry(modelFilePath, meshName) {
    loader = new THREE.GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(
        modelFilePath,
        (gltf) => {
            // console.log(gltf)
            let geometry = null;
            gltf.scene.traverse((child) => {
            if (child.isMesh && 
                (meshName === undefined || child.name === meshName)
            ) {
                geometry = child.geometry.clone();
            }
            });
            resolve(geometry);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened', error);
            reject(error);
        }
        );
    });
}

// TODO
// async function getModelMaterial(modelFilePath, meshName) {
//     loader = new THREE.GLTFLoader();
//     console.log(meshName)
//     return new Promise((resolve, reject) => {
//         loader.load(
//         modelFilePath,
//         (gltf) => {
//         //   console.log(gltf)
//             let geometry = null;
//             gltf.scene.traverse((child) => {
//             if (child.isMesh && 
//                 (meshName === undefined || child.name === meshName)
//             ) {
//                 geometry = child.geometry.clone();
//             }
//             });
//             resolve(geometry);
//         },
//         (xhr) => {
//             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//         },
//         (error) => {
//             console.error('An error happened', error);
//             reject(error);
//         }
//         );
//     });
// }