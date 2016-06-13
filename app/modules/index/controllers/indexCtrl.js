(function () {
    
    angular
        .module('indexCtrl', [])
        .controller('indexCtrl', [ indexCtrl])
        .directive('threeConstructor', threeConstructor);

        function threeConstructor() {
            return {
                restrict: 'E',
                templateUrl: '/app/modules/index/views/landing.html'
            }
        }
    
        function indexCtrl() {

            //scene
            var scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

            //camera
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.z = 10;

            //controls
            var controls = new THREE.OrbitControls(camera);
            controls.addEventListener('change', render);

            //render
            var renderer = new THREE.WebGLRenderer({antialias: false});
            renderer.setClearColor(scene.fog.color, 1);
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
            window.addEventListener('resize', onWindowResize, false);

            //lights for scene

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(1, 1, 1);
            scene.add(light);

            light = new THREE.DirectionalLight(0x002288);
            light.position.set(-1, -1, -1);
            scene.add(light);

            light = new THREE.AmbientLight(0x222222);
            scene.add(light);

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                render();
            }

            function render() {
                requestAnimationFrame( render );

                renderer.render( scene, camera );
            }
            render();

            //object geometry

            //CUBE
            var geometryBox = new THREE.BoxGeometry( 1, 1, 1 );
            var materialBox = new THREE.MeshLambertMaterial({ color: 0xFFCCCC, shading: THREE.FlatShading });
            var cube = new THREE.Mesh(geometryBox, materialBox);
            cube.position.x = Math.random() * 8 - 4;
            cube.position.y = Math.random() * 8 - 4;
            cube.position.z = Math.random() * 8 - 4;
            scene.add(cube);

            //Sphere
            var geometrySphere = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
            var materialSphere = new THREE.MeshLambertMaterial({ color: 0xFFCCCC, shading: THREE.FlatShading});
            var sphere = new THREE.Mesh(geometrySphere, materialSphere);
            sphere.position.x = Math.random() * 8 - 4;
            sphere.position.y = Math.random() * 8 - 4;
            sphere.position.z = Math.random() * 8 - 4;
            scene.add(sphere);

            //Pyramid
            var geometryPyramid = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, false);
            var materialPyramid = new THREE.MeshLambertMaterial({ color: 0xFFCCCC, shading: THREE.FlatShading});
            var pyramid = new THREE.Mesh(geometryPyramid, materialPyramid);
            pyramid.position.x = Math.random() * 8 - 4;
            pyramid.position.y = Math.random() * 8 - 4;
            pyramid.position.z = Math.random() * 8 - 4;
            scene.add(pyramid);


        }
    
})();