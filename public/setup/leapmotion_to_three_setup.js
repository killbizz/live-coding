async function initialize() {
	// dependencies
	await loadScript("files/setup/leap-motion/leap-1.1.1.js");
	await loadScript("files/setup/leap-motion/lib/leap-plugins-0.1.6.js");
}

initialize();

// starts object tracking, adding hands to the scene
// the object can be moved in the scene by closing the fist
function trackObjectWithLeapMotion(object) {

	var objectSelected = false
	var baseBoneRotation = (new THREE.Quaternion).setFromEuler(
		new THREE.Euler(Math.PI / 2, 0, 0)
	)

	Leap.loop({background: true}, {
    hand: function (hand) {

      // Check for "closed fist" gesture (all fingers not extended)
      var extendedFingers = hand.fingers.filter(function(finger) {
        return finger.extended
      })

      if (extendedFingers.length === 0) { // Closed fist detected
        var handPos = new THREE.Vector3().fromArray(hand.palmPosition)

        // console.log("close fist, position: " + handPos)

        // Check if hand is near the object
        var objectPos = object.position
        var distance = handPos.distanceTo(objectPos)

        if (distance < 50) {
          objectSelected = true
        }
      } else {
        objectSelected = false
      }

      // Move object if selected
      if (objectSelected) {
        object.position.set(hand.palmPosition[0], hand.palmPosition[1], hand.palmPosition[2])
      }

      hand.fingers.forEach(function (finger) {

        finger.data('boneMeshes').forEach(function(mesh, i){
          var bone = finger.bones[i]

          mesh.position.fromArray(bone.center())
          mesh.setRotationFromMatrix(
            (new THREE.Matrix4).fromArray(bone.matrix())
          )

          mesh.quaternion.multiply(baseBoneRotation)
        })

        finger.data('jointMeshes').forEach(function(mesh, i){
          var bone = finger.bones[i]

          if (bone) {
            mesh.position.fromArray(bone.prevJoint)
          } else {
            bone = finger.bones[i - 1]
            mesh.position.fromArray(bone.nextJoint)
          }
        })
      })

      var armMesh = hand.data('armMesh')
      armMesh.position.fromArray(hand.arm.center())
      armMesh.setRotationFromMatrix(
        (new THREE.Matrix4).fromArray(hand.arm.matrix())
      )
      armMesh.quaternion.multiply(baseBoneRotation)
      armMesh.scale.x = hand.arm.width / 2
      armMesh.scale.z = hand.arm.width / 4

      renderer.render(scene, camera)

    }
  })
  .use('handHold')
  .use('handEntry')
  .on('handFound', function(hand) {

    hand.fingers.forEach(function (finger) {

      var boneMeshes = []
      var jointMeshes = []

      finger.bones.forEach(function(bone) {
        var boneMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(5, 5, bone.length),
            new THREE.MeshPhongMaterial()
        )

        boneMesh.material.color.setHex(0xffffff)
        scene.add(boneMesh)
        boneMeshes.push(boneMesh)
      })

      for (var i = 0; i < finger.bones.length + 1; i++) {
        var jointMesh = new THREE.Mesh(
            new THREE.SphereGeometry(8),
            new THREE.MeshPhongMaterial()
        )

        jointMesh.material.color.setHex(0x0088ce)
        scene.add(jointMesh)
        jointMeshes.push(jointMesh)
      }

      finger.data('boneMeshes', boneMeshes)
      finger.data('jointMeshes', jointMeshes)

    })

    if (hand.arm) {
      var armMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, hand.arm.length, 64),
        new THREE.MeshPhongMaterial()
      )

      armMesh.material.color.setHex(0xffffff)
      scene.add(armMesh)
      hand.data('armMesh', armMesh)
    }

  })
  .on('handLost', function(hand) {

    hand.fingers.forEach(function (finger) {

      var boneMeshes = finger.data('boneMeshes')
      var jointMeshes = finger.data('jointMeshes')

      boneMeshes.forEach(function(mesh) {
        scene.remove(mesh)
      })

      jointMeshes.forEach(function(mesh) {
        scene.remove(mesh)
      })

      finger.data({ boneMeshes: null, jointMeshes: null })

    })

    var armMesh = hand.data('armMesh')
    scene.remove(armMesh)
    hand.data('armMesh', null)

    renderer.render(scene, camera)

  })
  .connect()

	// object moving
	// var rotateObject = function(){
  //   if (!objectSelected) {
  //     object.rotation.x += 0.01;
  //     object.rotation.y += 0.02;
  //   }
  //   renderer.render(scene, camera);
  //   window.requestAnimationFrame(rotateObject);
  // };

  // rotateObject();
}

function trackObjectWithDigitalizedHands(object) {
  let objectSelected = false;
  const baseBoneRotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );

  // Vertex Shader
  const vertexShader = `
    varying float vDepth;

    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform float depth;
    varying float vDepth;

    void main() {
      // Color transition from blue (far) to white (close) based on depth
      vec3 color = mix(vec3(0.0, 0.23, 1.0), vec3(1.0, 1.0, 1.0), 1.0 - depth);
      // Adjust alpha for transparency
      gl_FragColor = vec4(color, 0.5);
    }
  `;

  Leap.loop({ background: true }, {
    hand: function (hand) {
      var extendedFingers = hand.fingers.filter(function(finger) {
        return finger.extended;
      });

      var handPos = new THREE.Vector3().fromArray(hand.palmPosition);

      var centerOfScene = new THREE.Vector3(0, 0, 0);
      var distanceFromCenter = handPos.distanceTo(centerOfScene) / 500.0;

      if (extendedFingers.length === 0) { // Closed fist detected

        var objectPos = object.position;
        var distance = handPos.distanceTo(objectPos);

        if (distance < 50) {
          objectSelected = true;
        }
      } else {
        objectSelected = false;
      }

      if (objectSelected) {
        object.position.set(hand.palmPosition[0], hand.palmPosition[1], hand.palmPosition[2]);
      }

      hand.fingers.forEach(function (finger) {
        finger.data('boneMeshes').forEach(function(mesh, i) {
          var bone = finger.bones[i];
          mesh.position.fromArray(bone.center());
          mesh.setRotationFromMatrix((new THREE.Matrix4).fromArray(bone.matrix()));
          mesh.quaternion.multiply(baseBoneRotation);
          
          mesh.material.uniforms.depth.value = distanceFromCenter;
        });

        finger.data('jointMeshes').forEach(function(mesh, i) {
          var bone = finger.bones[i];
          if (bone) {
            mesh.position.fromArray(bone.prevJoint);
          } else {
            bone = finger.bones[i - 1];
            mesh.position.fromArray(bone.nextJoint);
          }

          mesh.material.uniforms.depth.value = distanceFromCenter;
        });
      });

      var armMesh = hand.data('armMesh');
      armMesh.position.fromArray(hand.arm.center());
      armMesh.setRotationFromMatrix((new THREE.Matrix4).fromArray(hand.arm.matrix()));
      armMesh.quaternion.multiply(baseBoneRotation);
      armMesh.scale.x = hand.arm.width / 2;
      armMesh.scale.z = hand.arm.width / 4;

      armMesh.material.uniforms.depth.value = distanceFromCenter;

      renderer.render(scene, camera);
    }
  })
  .use('handHold')
  .use('handEntry')
  .on('handFound', function(hand) {
    hand.fingers.forEach(function (finger) {
      var boneMeshes = [];
      var jointMeshes = [];

      finger.bones.forEach(function(bone) {
        var boneMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(5, 5, bone.length),
          new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
              depth: { value: 0.0 }
            },
            blending: THREE.AdditiveBlending,
					  depthTest: false, depthWrite: false,
					  transparent: true
          })
        );

        scene.add(boneMesh);
        boneMeshes.push(boneMesh);
      });

      for (var i = 0; i < finger.bones.length + 1; i++) {
        var jointMesh = new THREE.Mesh(
          new THREE.SphereGeometry(8),
          new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
              depth: { value: 0.0 }
            },
            blending: THREE.AdditiveBlending,
					  depthTest: false, depthWrite: false,
					  transparent: true
          })
        );

        scene.add(jointMesh);
        jointMeshes.push(jointMesh);
      }

      finger.data('boneMeshes', boneMeshes);
      finger.data('jointMeshes', jointMeshes);
    });

    if (hand.arm) {
      var armMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, hand.arm.length, 64),
        new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            depth: { value: 0.0 }
          },
          blending: THREE.AdditiveBlending,
          depthTest: false, depthWrite: false,
          transparent: true
        })
      );

      scene.add(armMesh);
      hand.data('armMesh', armMesh);
    }
  })
  .on('handLost', function(hand) {
    hand.fingers.forEach(function (finger) {
      var boneMeshes = finger.data('boneMeshes');
      var jointMeshes = finger.data('jointMeshes');

      boneMeshes.forEach(function(mesh) {
        scene.remove(mesh);
      });

      jointMeshes.forEach(function(mesh) {
        scene.remove(mesh);
      });

      finger.data({ boneMeshes: null, jointMeshes: null });
    });

    var armMesh = hand.data('armMesh');
    scene.remove(armMesh);
    hand.data('armMesh', null);

    renderer.render(scene, camera);
  })
  .connect();
}

function trackObjectWithDigitalizedHands2(object) {
  let objectSelected = false;
  const baseBoneRotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );

  var pointSize = 1;
  var tara = 300;
  var ratio = 1;

  // Vertex Shader
  const vertexShader = `
    uniform float pointSize;
    void main() {
      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform float depth;

    void main() {
      // Color transition from blue (far) to white (close) based on depth
      vec3 color = mix(vec3(0.0, 0.23, 1.0), vec3(1.0, 1.0, 1.0), 1.0 - depth);
      // Adjust alpha for transparency
      gl_FragColor = vec4(color, 0.5);
    }
  `;

  function createPointSampledGeometry(originalGeometry, ratio = 1) {
    // If originalGeometry is not a BufferGeometry, convert it to one manually
    let bufferGeometry;
    if (originalGeometry.isBufferGeometry) {
      bufferGeometry = originalGeometry;
    } else {
      // Convert the geometry to a BufferGeometry manually if it's not already one
      bufferGeometry = new THREE.BufferGeometry();
      
      // Extract positions (vertices) from original geometry
      const vertices = originalGeometry.attributes.position.array;
      bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    }
  
    // Get the positions from the buffer geometry
    const positions = bufferGeometry.attributes.position.array;
  
    // Calculate total number of vertices
    const totalVertices = positions.length / 3;
  
    // Determine how many points to sample based on the ratio
    const sampleCount = Math.floor(totalVertices / ratio);
  
    // Create a new array to store the sampled points
    const pointsArray = [];
  
    // Sample every nth vertex based on the ratio
    for (let i = 0; i < sampleCount; i++) {
      // Multiply by 3 because of x, y, z coordinates
      const vertexIndex = Math.floor(i * ratio) * 3;
      if (vertexIndex < positions.length) {
        const vertex = positions.slice(vertexIndex, vertexIndex + 3);
        pointsArray.push(...vertex);
      }
    }
  
    const pointCloudGeometry = new THREE.BufferGeometry();
    pointCloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));
  
    return pointCloudGeometry;
  }
  
  
  

  Leap.loop({ background: true }, {
    hand: function (hand) {
      var extendedFingers = hand.fingers.filter(function(finger) {
        return finger.extended;
      });

      var handPos = new THREE.Vector3().fromArray(hand.palmPosition);

      var centerOfScene = new THREE.Vector3(0, 0, 0);
      var distanceFromCenter = handPos.distanceTo(centerOfScene) / tara;

      if (extendedFingers.length === 0) { // Closed fist detected

        var objectPos = object.position;
        var distance = handPos.distanceTo(objectPos);

        if (distance < 50) {
          objectSelected = true;
        }
      } else {
        objectSelected = false;
      }

      if (objectSelected) {
        object.position.set(hand.palmPosition[0], hand.palmPosition[1], hand.palmPosition[2]);
      }

      hand.fingers.forEach(function (finger) {
        finger.data('boneMeshes').forEach(function(mesh, i) {
          var bone = finger.bones[i];
          mesh.position.fromArray(bone.center());
          mesh.setRotationFromMatrix((new THREE.Matrix4).fromArray(bone.matrix()));
          mesh.quaternion.multiply(baseBoneRotation);
          
          mesh.material.uniforms.depth.value = distanceFromCenter;
        });

        finger.data('jointMeshes').forEach(function(mesh, i) {
          var bone = finger.bones[i];
          if (bone) {
            mesh.position.fromArray(bone.prevJoint);
          } else {
            bone = finger.bones[i - 1];
            mesh.position.fromArray(bone.nextJoint);
          }

          mesh.material.uniforms.depth.value = distanceFromCenter;
        });
      });

      var armMesh = hand.data('armMesh');
      armMesh.position.fromArray(hand.arm.center());
      armMesh.setRotationFromMatrix((new THREE.Matrix4).fromArray(hand.arm.matrix()));
      armMesh.quaternion.multiply(baseBoneRotation);
      armMesh.scale.x = hand.arm.width / 2;
      armMesh.scale.z = hand.arm.width / 4;

      armMesh.material.uniforms.depth.value = distanceFromCenter;

      renderer.render(scene, camera);
    }
  })
  .use('handHold')
  .use('handEntry')
  .on('handFound', function(hand) {
    hand.fingers.forEach(function (finger) {
      var boneMeshes = [];
      var jointMeshes = [];

      finger.bones.forEach(function(bone) {
        const geometry = new THREE.CylinderGeometry(5, 5, bone.length);
        const pointSampledGeometry = createPointSampledGeometry(geometry, ratio);
        var boneMesh = new THREE.Mesh(
          pointSampledGeometry,
          new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
              depth: { value: 0.0 },
              pointSize: { value: pointSize }
            },
            blending: THREE.AdditiveBlending,
					  depthTest: false, depthWrite: false,
					  transparent: true
          })
        );

        scene.add(boneMesh);
        boneMeshes.push(boneMesh);
      });

      for (var i = 0; i < finger.bones.length + 1; i++) {
        const geometry = new THREE.SphereGeometry(8);
        const pointSampledGeometry = createPointSampledGeometry(geometry, ratio);
        var jointMesh = new THREE.Mesh(
          pointSampledGeometry,
          new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
              depth: { value: 0.0 },
              pointSize: { value: pointSize }
            },
            blending: THREE.AdditiveBlending,
					  depthTest: false, depthWrite: false,
					  transparent: true
          })
        );

        scene.add(jointMesh);
        jointMeshes.push(jointMesh);
      }

      finger.data('boneMeshes', boneMeshes);
      finger.data('jointMeshes', jointMeshes);
    });

    if (hand.arm) {
      const geometry = new THREE.CylinderGeometry(1, 1, hand.arm.length, 64);
      const pointSampledGeometry = createPointSampledGeometry(geometry, ratio);
      var armMesh = new THREE.Mesh(
        pointSampledGeometry,
        new THREE.ShaderMaterial({
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            depth: { value: 0.0 },
            pointSize: { value: pointSize }
          },
          blending: THREE.AdditiveBlending,
          depthTest: false, depthWrite: false,
          transparent: true
        })
      );

      scene.add(armMesh);
      hand.data('armMesh', armMesh);
    }
  })
  .on('handLost', function(hand) {
    hand.fingers.forEach(function (finger) {
      var boneMeshes = finger.data('boneMeshes');
      var jointMeshes = finger.data('jointMeshes');

      boneMeshes.forEach(function(mesh) {
        scene.remove(mesh);
      });

      jointMeshes.forEach(function(mesh) {
        scene.remove(mesh);
      });

      finger.data({ boneMeshes: null, jointMeshes: null });
    });

    var armMesh = hand.data('armMesh');
    scene.remove(armMesh);
    hand.data('armMesh', null);

    renderer.render(scene, camera);
  })
  .connect();
}