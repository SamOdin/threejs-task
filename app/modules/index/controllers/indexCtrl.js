(function () {
    
    angular
        .module('indexCtrl', [])
        .controller('indexCtrl', ['$scope', indexCtrl])
        .directive('threeConstructor', threeConstructor);

        function threeConstructor() {
            return {
                restrict: 'E',
                templateUrl: '/app/modules/index/views/landing.html'
            }
        }
    
        function indexCtrl($scope) {

            $scope.threeConst = false;
            $scope.formCont = true;
            
            $scope.singIn = function (login, password) {
                if(login == 'admin' && password == 'superpass') {
                    $scope.threeConst = true;
                    $scope.formCont = false
                }
            };

            //scene
            var scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

            //camera
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.z = 10;

            //render
            var renderer = new THREE.WebGLRenderer({antialias: false});
            renderer.setClearColor(scene.fog.color, 1);
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
            window.addEventListener('resize', onWindowResize, false);

            //controls
            var controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = false;

            //lights for scene

            scene.add( new THREE.AmbientLight( 0x666666 ) );
            var light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
            light.position.set( 50, 200, 100 );
            light.position.multiplyScalar( 1.3 );
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            var d = 300;
            light.shadow.camera.left = - d;
            light.shadow.camera.right = d;
            light.shadow.camera.top = d;
            light.shadow.camera.bottom = - d;
            light.shadow.camera.far = 1000;
            scene.add( light );

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                render();
            }

            function render() {
                requestAnimationFrame( render );
                controls.update();
                renderer.render( scene, camera );
            }
            render();

            //object geometry
            var material = new THREE.MeshLambertMaterial({ color: 0xCC99FF, shading: THREE.FlatShading });
            var geometryBox = new THREE.BoxGeometry( 1, 1, 1 );
            var geometrySphere = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
            var geometryPyramid = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);

            $scope.createObj = function (geometry, scale) {

                if(!isNaN(parseFloat(scale)) && isFinite(scale)) {

                    if(geometry == 'cube') {

                        var cube = new THREE.Mesh(geometryBox, material);
                        cube.position.x = Math.random() * 8 - 4;
                        cube.position.y = Math.random() * 8 - 4;
                        cube.position.z = Math.random() * 8 - 4;
                        cube.scale.set(scale, scale, scale);
                        scene.add(cube);

                    } else if(geometry == 'pyramid') {

                        var pyramid = new THREE.Mesh(geometryPyramid, material);
                        pyramid.position.x = Math.random() * 8 - 4;
                        pyramid.position.y = Math.random() * 8 - 4;
                        pyramid.position.z = Math.random() * 8 - 4;
                        pyramid.scale.set(scale, scale, scale);
                        scene.add(pyramid);

                    } else if(geometry == 'sphere') {

                        var sphere = new THREE.Mesh(geometrySphere, material);
                        sphere.position.x = Math.random() * 8 - 4;
                        sphere.position.y = Math.random() * 8 - 4;
                        sphere.position.z = Math.random() * 8 - 4;
                        sphere.scale.set(scale, scale, scale);
                        scene.add(sphere);

                    }
                } else {
                    console.log('Scale not a number!');
                }
            };

            console.log(scene.children);
            $scope.mainScene = scene.children;

            $scope.deleteObj = function (obj) {
                var index = scene.children.indexOf(obj);
                scene.children.splice(index, 1);
            }
            
        }
    
})();