import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls';
import { Water} from 'Water2';

class Background{
    constructor(){
        const back = document.querySelector('.background');
        back.Background = new THREE.Color(0xfff9cb)
        this._back = back;

        const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        back.appendChild(renderer.domElement);
        this._renderer = renderer;
    
        const scene = new THREE.Scene();
        this._scene = scene;
    
        this._setupCamera();
        this._setupLight();
        this._setupModel(); 
        // this._setupControls();
    
        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
    _setupControls() {
        const controls = new OrbitControls(this._camera, this._back);
        controls.enableDamping = true;
        this._controls = controls;
    }
    _setupCamera() {
        const fov = 30;
        const aspect = this._back.clientWidth / this._back.clientHeight;
        const near = 1;
        const far = 500;
        const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        camera.position.set(0,20,45);
        this._camera = camera;
        this._scene.add(this._camera);
        this._camera.lookAt(this._scene.position);
    }
    
    _setupLight() {
        const light = new THREE.AmbientLight({color:0xffffff,intencity:1});
        this._camera.add(light);
    }
    _setupModel() {
        // const groundGeometry = new THREE.PlaneGeometry(20,20);
	    // const groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4, color: 0x818181} );
		// const ground = new THREE.Mesh( groundGeometry, groundMaterial );
        // ground.rotation.x = Math.PI * - 0.5;
		// ground.position.x = -10
		// this._scene.add( ground );
        // this._ground = ground;

		// const textureLoader = new THREE.TextureLoader();
		// textureLoader.load( 'img/grain.webp',
        //  function ( map ) {
		// 	map.wrapS = THREE.RepeatWrapping;
		// 	map.wrapT = THREE.RepeatWrapping;
		// 	map.anisotropy = 16;
		// 	map.repeat.set( 4, 10 );
		// 	groundMaterial.map = map;
		// 	groundMaterial.needsUpdate = true;
		// }
        // );

        

        const waterGeomatry = new THREE.SphereGeometry(30,60,60);
        const water = new Water(waterGeomatry,{color:'#ffffff',scale:2,flowDirection:new THREE.Vector3(1,1),
        textureWidth: 1024,
        textureHeight: 1024});
        water.position.x = -10;
        this._water = water;
		// water.rotation.x = Math.PI * - 0.5;
        this._scene.add(water);
        // const blurloader = new THREE.TextureLoader();
        // blurloader.load('img/blur.webp');

        const lineMate = new THREE.MeshBasicMaterial({color:'#fff'});
        const line = new THREE.LineSegments(new THREE.WireframeGeometry(waterGeomatry),lineMate);
        this._line = line;
        this._scene.add(line);
    }
    resize(){
        const width = this._back.clientWidth;
        const height = this._back.clientHeight;
        this._camera.aspect = width/height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width,height);
        // this._controls.update();
    }
    render(time){
        time *= 0.0001;
        this._line.rotation.x = time;
        this._line.rotation.y = time;
        this._renderer.render(this._scene,this._camera);
        requestAnimationFrame(this.render.bind(this));
    }
}


    


window.onload = function(){
    new Background();
}
