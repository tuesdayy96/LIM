import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader'
import { OrbitControls } from 'OrbitControls';
import { Water} from 'Water2';
import { TextureLoader } from 'three';

class Background{
    constructor(){
        const back = document.querySelector('.background');
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
        const d_light = new THREE.DirectionalLight({color:0xffffff,intencity:0.7});
        const light = new THREE.AmbientLight({color:0xffffff,intencity:1});
        this._camera.add(light);
        this._scene.add(d_light);
    }
    _setupModel() {
        
        const waterGeomatry = new THREE.SphereGeometry(40,60,60);
        const flowmap = new THREE.TextureLoader().load('textures/water/Water_1_M_Flow.jpg')
        const water = new Water(waterGeomatry,{
            color:'#ffffff',
            scale:2,
            textureWidth: 1024,
            textureHeight: 1024,
            flowmap : flowmap
        });
        water.position.x = -10;
        this._water = water;
        this._scene.add(water);

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
