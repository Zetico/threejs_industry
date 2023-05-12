<template>
    <el-container>
        <el-header>
            <el-button @click="quzoucailiao1">一号炉子</el-button>
            <el-button @click="quzoucailiao2">二号炉子</el-button>
            <el-button @click="quzoucailiao3">三号炉子</el-button>
            <el-button @click="jixxiebi1">机械臂1</el-button>
            <el-button @click="yeyaji">液压机</el-button>


        </el-header>
        <div class="main" ref="main">
            <el-main id="webgl">
            </el-main>
        </div>
    </el-container>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';//引入相机轨道控制器OrbitControls
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';//引入ColladaLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';//引入GLTFLoader
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';//引入tween动画库

export default {
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            controls: null,
            width: null,
            height: null,
            donghuazhuangtai: 0,
            jiazai:21,
            k1:null,
            k2:null,
            k3:null,
            paras1:{},
            paras2:{},
            paras3:{},
        }
    },
    methods: {
         init() {
            this.width = this.$refs.main.offsetWidth
            this.height = this.$refs.main.offsetHeight
            //创建三维场景
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0xcce0ff, 10, 500);

            const material = new THREE.MeshLambertMaterial({
                color: 0xffffff,//red
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })

            const jrl1 = this.jrl();
            this.scene.add(jrl1);
            const jrl2 = this.jrl();
            jrl2.translateX(-10);
            this.scene.add(jrl2);
            const jrl3 = this.jrl();
            jrl3.translateX(-20);
            this.scene.add(jrl3);
            jrl1.children[9].name = 'db1';
            jrl2.children[9].name = 'db2';
            jrl3.children[9].name = 'db3';

            //轨道
            const guidao1 = this.guidao();
            guidao1.position.set(-10, 0.5, -5);//定义位置 
            const guidao2 = this.guidao();
            guidao2.position.set(-10, 0.5, -8);//定义位置
            this.scene.add(guidao1);
            this.scene.add(guidao2);

            //轨道车
            const guidaoche = this.guidaoche();
            guidaoche.position.set(-1, 1, -6);//定义位置
            this.scene.add(guidaoche);

            //导入collada模型
            const cloader = new ColladaLoader();
            //第一个
            cloader.load('./机械臂.dae', (collada)=>{
                const dae = collada.scene;
                this.k1 = collada.kinematics;
                for(const prop in this.k1.joints){
                    if(!this.k1.joints[prop].static){
                        const joint = this.k1.joints[prop];
                        const position = joint.zeroPosition;
                        this.paras1[prop] =position;
                    }
                }
                // console.log(dae.children[0].children[0].children[1].children[0].children[0].children[0]);
                // dae.children[0].children[0].children[1].children[0].children[0].children[0].position.set(20, 20, 20);
                // dae.children[0].children[0].children[1].children[0].children[0].children[0].scale.set(20, 20, 20);
                // console.log(dae);
                // console.log(this.k1)
                dae.name = "机械臂1"
                this.scene.add(dae);
                dae.traverse((child) => {
                    if (child.isMesh) {
                        child.material.flatShading = true;
                        child.material.color = new THREE.Color(0x993300);
                    }
                })
                dae.scale.x = dae.scale.y = dae.scale.z = 4;
                dae.translateY(16);
                dae.translateX(-5);
            }, (xhr)=>{
                if(xhr.loaded == 5157221){
                    this.jiazai--;
                    console.log('第一个机械臂加载完成'+this.jiazai);
                }
            })

            //第二个
            cloader.load('./机械臂.dae', (collada) => {
                const dae = collada.scene;
                this.k2 = collada.kinematics;
                for(const prop in this.k2.joints){
                    if(!this.k2.joints[prop].static){
                        const joint = this.k2.joints[prop];
                        const position = joint.zeroPosition;
                        this.paras2[prop] =position;
                    }
                }
                dae.name = "机械臂2"
                this.scene.add(dae);
                dae.traverse((child) => {
                    if (child.isMesh) {
                        child.material.flatShading = true;
                        child.material.color = new THREE.Color(0x993300);
                    }
                })
                dae.scale.x = dae.scale.y = dae.scale.z = 4;
                dae.translateY(30);
                dae.translateX(-38);
            }, (xhr)=>{
                if(xhr.loaded == 5157221){
                    this.jiazai--;
                    console.log('第二个机械臂加载完成'+this.jiazai);
                }
            })
            //第三个
            const loader = new GLTFLoader();
            loader.load('./机柜.glb', (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.flatShading = true;
                        child.material.color = new THREE.Color(0x333333);
                    }
                })
                model.rotateY(Math.PI)
                model.scale.set(2.5, 2.5, 2.5);
                model.translateX(-25);
                model.translateZ(-10)
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 1430660){
                    this.jiazai--;
                    console.log('机柜1加载完成'+this.jiazai);
                }
            })

             loader.load('./机柜.glb', (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.flatShading = true;
                        child.material.color = new THREE.Color(0x333333);
                    }
                })
                model.rotateY(Math.PI)
                model.scale.set(2.5, 2.5, 2.5);
                model.translateX(-27);
                model.translateZ(-10)
                this.scene.add(model);
            }, (xhr)=>{
                 if(xhr.loaded == 1430660){
                     this.jiazai--;
                     console.log('机柜2加载完成'+this.jiazai);
                 }
             })
            loader.load('./风扇.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(1.5, 1.5, 1.5);
                // model.translateX(-27);
                // model.translateZ(-10)
                model.translateY(5);
                model.translateZ(14.5);
                model.translateX(0.6);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 204676){
                    this.jiazai--;
                    console.log('风扇1加载完成'+this.jiazai);
                }
            })
            loader.load('./风扇.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(1.5, 1.5, 1.5);
                // model.translateX(-27);
                // model.translateZ(-10)
                model.translateY(5);
                model.translateZ(14.5);
                model.translateX(0.6 - 10);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 204676){
                    this.jiazai--;
                    console.log('风扇2加载完成'+this.jiazai);
                }
            })
            loader.load('./风扇.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(1.5, 1.5, 1.5);
                // model.translateX(-27);
                // model.translateZ(-10)
                model.translateY(5);
                model.translateZ(14.5);
                model.translateX(0.6 - 20);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 204676){
                    this.jiazai--;
                    console.log('风扇3加载完成'+this.jiazai);
                }
            })

            loader.load('./传送带.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(1.5, 1.5, 1.5);
                model.rotateY(-Math.PI / 5);
                model.translateX(-46);
                model.translateZ(-5);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 316868){
                    this.jiazai--;
                    console.log('传送带加载完成'+this.jiazai);
                }
            })
            //第一个
            loader.load('./液压机.glb', (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    // 模型转到一定角度消失 DoubleSide 解决
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                });
                model.scale.set(1.6, 1.6, 1.6);
                model.translateX(-3);
                model.translateZ(-22);
                model.rotateY(Math.PI / 2);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 167835804){
                    this.jiazai--;
                    console.log('液压机加载完成'+this.jiazai);
                }
            })
            //第二个
            loader.load('./切边机.glb', (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    // 模型转到一定角度消失 DoubleSide 解决
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                });
                model.scale.set(1.1, 2, 1.1);
                model.translateX(-38);
                model.translateZ(-25);
                model.rotateY(Math.PI / 2);
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 167830104){
                    this.jiazai--;
                    console.log('切边机加载完成'+this.jiazai);
                }
            })


            loader.load('./工作台.glb', (gltf) => {
                const model = gltf.scene;
                model.translateX(-10);
                model.translateZ(-15);
                model.translateY(1);

                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 8304){
                    this.jiazai--;
                    console.log('工作台加载完成'+this.jiazai);
                }
            })

            loader.load('./置物台.glb', (gltf) => {
                const model = gltf.scene;
                model.translateX(-44);
                model.translateZ(-30);
                model.translateY(1);

                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 8256){
                    this.jiazai--;
                    console.log('置物台加载完成'+this.jiazai);
                }
            })
            //加热炉一中的零件
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateX(-1.8);
                model.translateY(0.3);
                model.translateZ(1.6);
                model.name = '未加工物料1';
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('加热炉一中的零件加载完成'+this.jiazai);
                }
            })
            //加热炉二中的零件
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(0.3);
                model.translateZ(1.6);
                model.translateX(-11.8);
                model.name = '未加工物料2';
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('加热炉二中的零件加载完成'+this.jiazai);
                }
            })
            //加热炉三中的零件
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(0.3);
                model.translateZ(1.6);
                model.translateX(-21.8);
                model.name = '未加工物料3';
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('加热炉三中的零件加载完成'+this.jiazai);
                }
            })
            //工作台上的未加工物料
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(1.1);
                model.translateZ(-16);
                model.translateX(-11.8);
                model.name = '未加工物料4';
                model.visible = false;
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('工作台上的未加工物料加载完成'+this.jiazai);
                }
            })
            //工作台上的零件
            loader.load('./零件.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(2.2);
                model.translateZ(-14.5);
                model.translateX(-10.3);
                model.name = '零件1';
                model.visible = false;
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 315688){
                    this.jiazai--;
                    console.log('工作台上的零件加载完成'+this.jiazai);
                }
            })

            //液压机上的零件
            loader.load('./零件.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(2);
                model.translateZ(-21);
                model.translateX(-2.7);
                model.name = '零件2';
                model.visible = false;
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 315688){
                    this.jiazai--;
                    console.log('第一个机械臂上的零件加载完成'+this.jiazai);
                }
            })
            //液压机上的未加工物料
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateY(0.5);
                model.translateZ(-23);
                model.translateX(-4.3);
                model.name = '未加工物料5';
                model.visible = false;
                this.scene.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('第一个机械臂上的未加工物料加载完成'+this.jiazai);
                }
            })
             //切片机上的零件
             loader.load('./零件.glb', (gltf) => {
                 const model = gltf.scene;
                 model.scale.set(2.5,2.5,2.5);
                 model.translateY(2.3);
                 model.translateZ(-24.7);
                 model.translateX(-38);
                 model.name = '零件3';
                 model.visible = true;
                 this.scene.add(model);
             }, (xhr)=>{
                 if(xhr.loaded == 315688){
                     this.jiazai--;
                     console.log('第一个机械臂上的零件加载完成'+this.jiazai);
                 }
             })
            // loader.load('./大玩意.glb', (gltf) => {
            //     const model = gltf.scene;
            //     model.scale.set(5, 5, 5);
            //     model.traverse((child) => {
            //         if (child.isMesh) {
            //             child.material.flatShading = true;
            //             child.material.color = new THREE.Color(0x333333);
            //         }
            //     })
            //     // // model.translateX(-27);
            //     // // model.translateZ(-10)
            //     // model.translateY(5);
            //     model.translateZ(50);
            //     // model.translateX(0.6-20);
            //     this.scene.add(model);
            // })


            const sq = new THREE.PlaneGeometry(500, 500);
            const dibancaizhi = new THREE.TextureLoader().load('./wall.jpg');
            dibancaizhi.wrapS = THREE.RepeatWrapping;
            dibancaizhi.wrapT = THREE.RepeatWrapping;
            dibancaizhi.repeat.set(100, 100);
            const grassMaterial = new THREE.MeshBasicMaterial({ map: dibancaizhi });


            //定义一个网格模型，表示物体
            const ground = new THREE.Mesh(sq, grassMaterial)
            ground.position.set(0, 0, 0);//定义位置
            ground.rotateX(-Math.PI / 2);
            this.scene.add(ground);


            //创建一个三维坐标轴
            const axesHelper = new THREE.AxesHelper(150);
            this.scene.add(axesHelper);

            //创建一个点光源
            const pointlight = new THREE.PointLight(0xffffff, 0.2);
            pointlight.position.set(400, 200, -100);
            this.scene.add(pointlight);

             const pointlight2 = new THREE.PointLight(0xffffff, 0.2);
             pointlight2.position.set(400, 200, 100);
             this.scene.add(pointlight2);

            //环境光
            const light = new THREE.AmbientLight(0x404040); // soft white light
            this.scene.add(light);
            // //平行光
            // const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
            // this.scene.add( directionalLight );

            //创建相机（透视投影相机）
            this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 30000000000);
            this.camera.position.set(50, 51, 50);//相机位置
            //相机的方向
            this.camera.lookAt(0, 0, 0)

            //创建一个渲染器
            this.renderer = new THREE.WebGLRenderer({
                //设置抗锯齿
                antialias: true,
            });
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.setSize(this.width, this.height);//尺寸
            this.renderer.setClearColor(0xcce0ff, 1);
            this.renderer.render(this.scene, this.camera);//渲染

            //把渲染结果添加到网页页面上
            document.getElementById('webgl').appendChild(this.renderer.domElement);


            // 创建相机控制器
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;

            //设置相机控制器范围
            this.controls.minDistance = 1;
            this.controls.maxDistance = 1000;
            this.controls.maxPolarAngle = Math.PI / 2.15;

        },
        listen() {
            window.addEventListener("resize", () => {
                // console.log("变化")
                this.camera.aspect = this.$refs.main.offsetWidth / this.$refs.main.offsetHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.$refs.main.offsetWidth, this.$refs.main.offsetHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                // console.log(this.$refs.main.offsetWidth);
                // console.log(this.$refs.main.offsetHeight);
            })
        },
        animate() {
            TWEEN.update();
            requestAnimationFrame(this.animate);//一直循环执行，每秒执行60次
            this.controls.update();
            this.renderer.render(this.scene, this.camera);//渲染
            if(this.jiazai == 0){
            }

        },
        jrl() {
            const material = new THREE.MeshLambertMaterial({
                color: 0x778899,
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })


            //底座
            const dizuotiao = new THREE.BoxGeometry(5, 0.2, 1);
            const dizuotiaomesh1 = new THREE.Mesh(dizuotiao, material);
            dizuotiaomesh1.rotateX(Math.PI / 2);
            // scene.add(dizuotiaomesh1);

            const dizuotiaomesh2 = new THREE.Mesh(dizuotiao, material);
            dizuotiaomesh2.rotateX(Math.PI / 2);
            dizuotiaomesh2.translateY(5);
            // scene.add(dizuotiaomesh2);

            function zhengmian() {
                //加热炉正面
                const shape = new THREE.Shape();
                shape.moveTo(2.5, 0.5);
                shape.lineTo(2.5, 5);
                shape.lineTo(-2.5, 5);
                shape.lineTo(-2.5, 0.5);
                shape.lineTo(2.5, 0.5);

                const hole = new THREE.Path();
                hole.moveTo(1.5, 1);
                hole.lineTo(1.5, 3);
                hole.lineTo(-1.5, 3);
                hole.lineTo(-1.5, 1);
                hole.lineTo(1.5, 1);
                shape.holes.push(hole);

                const jairelujiheti = new THREE.ShapeGeometry(shape);
                const jairelu = new THREE.Mesh(jairelujiheti, material);
                return jairelu;
            }
            //加热炉侧面
            function jiarelu() {
                const shape2 = new THREE.Shape();
                shape2.moveTo(2.5, 0.5);
                shape2.lineTo(2.5, 5);
                shape2.lineTo(-2.5, 5);
                shape2.lineTo(-2.5, 0.5);
                shape2.lineTo(2.5, 0.5);
                const jairelucemianjiheti = new THREE.ShapeGeometry(shape2);
                const jairelucemian = new THREE.Mesh(jairelucemianjiheti, material);
                return jairelucemian;
            }
            function dimian() {
                const shape = new THREE.Shape();
                shape.moveTo(2.5, 0.5);
                shape.lineTo(2.5, 5.5);
                shape.lineTo(-2.5, 5.5);
                shape.lineTo(-2.5, 0.5);
                shape.lineTo(2.5, 0.5);
                const jairelucemianjiheti = new THREE.ShapeGeometry(shape);
                const jairelucemian = new THREE.Mesh(jairelucemianjiheti, material);
                return jairelucemian;
            }

            function dangban() {
                //加热炉正面
                const shape = new THREE.Shape();
                shape.moveTo(1.5, 1);
                shape.lineTo(1.5, 3);
                shape.lineTo(-1.5, 3);
                shape.lineTo(-1.5, 1);
                shape.lineTo(1.5, 1);

                const extrudeSettings = {
                    // steps: 2,
                    depth: 0.0000001,
                    // bevelEnabled: true,
                    // bevelThickness: 1,
                    // bevelSize: 1,
                    // bevelOffset: 0,
                    // bevelSegments: 1
                };

                const jairelujiheti = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const dangban = new THREE.Mesh(jairelujiheti, material);
                return dangban;
            }
            const zm = zhengmian();
            // scene.add(zm);



            const zuocemian = jiarelu();
            zuocemian.rotateY(Math.PI / 2);
            zuocemian.position.set(2.5, 0, 2.5);
            // scene.add(zuocemian);

            const houmian = jiarelu();
            houmian.position.set(0, 0, 5);
            // scene.add(houmian);

            const youcemian = jiarelu();
            youcemian.rotateY(Math.PI / 2);
            youcemian.position.set(-2.5, 0, 2.5);
            // scene.add(youcemian);

            const dm = dimian();
            dm.rotateX(Math.PI / 2);
            dm.position.set(0, 0.5, -0.5);
            // scene.add(dm);

            const shangmian = dimian();
            shangmian.rotateX(Math.PI / 2);
            shangmian.position.set(0, 5, -0.5);
            // scene.add(shangmian);

            const db = dangban();


            //燃烧炉红光
            const ranshao = new THREE.PointLight(0xFF0000, 2, 10);
            ranshao.position.set(0, 4, 3);
            // scene.add( ranshao );

            const jel = new THREE.Group();
            jel.add(zm);
            jel.add(zuocemian);
            jel.add(houmian);
            jel.add(youcemian);
            jel.add(dm);
            jel.add(shangmian);
            jel.add(ranshao);
            jel.add(dizuotiaomesh1);
            jel.add(dizuotiaomesh2);
            jel.add(db);


            return jel
        },
        dbkaiqi(dbname) {
            //tween动画 
            const tween1 = new TWEEN.Tween(this.scene.getObjectByName(dbname).position)
            tween1.to({
                x: 0,
                y: 0,
                z: -0.2
            }, 1000)
            tween1.onUpdate(() => {
                this.scene.getObjectByName(dbname).position.set(this.scene.getObjectByName(dbname).position.x, this.scene.getObjectByName(dbname).position.y, this.scene.getObjectByName(dbname).position.z);
            })
            tween1.easing(TWEEN.Easing.Quadratic.InOut)
            tween1.start();

            const tween2 = new TWEEN.Tween(this.scene.getObjectByName(dbname).position)
            tween2.to({
                x: 0,
                y: 2,
                z: -0.2
            }, 1500)
            tween2.onUpdate(() => {
                this.scene.getObjectByName(dbname).position.set(this.scene.getObjectByName(dbname).position.x, this.scene.getObjectByName(dbname).position.y, this.scene.getObjectByName(dbname).position.z);
            })
            tween2.easing(TWEEN.Easing.Quadratic.InOut)
            tween1.chain(tween2);
            tween2.onComplete(() => {
                this.zhuazizhuaqu(dbname);
            })

        },
        dbguanbi(dbname) {
            let lj = null;
            if(dbname == "db1"){
                lj = "未加工物料1"
            };
            if(dbname == "db2"){
                lj = "未加工物料2"
            };
            if(dbname == "db3"){
                lj = "未加工物料3"
            };
            //tween动画 
            const tween1 = new TWEEN.Tween(this.scene.getObjectByName(dbname).position)
            tween1.to({
                x: 0,
                y: 0,
                z: -0.2
            }, 1000)
            tween1.onUpdate(() => {
                this.scene.getObjectByName(dbname).position.set(this.scene.getObjectByName(dbname).position.x, this.scene.getObjectByName(dbname).position.y, this.scene.getObjectByName(dbname).position.z);
            })
            tween1.easing(TWEEN.Easing.Quadratic.InOut)
            const tween2 = new TWEEN.Tween(this.scene.getObjectByName(dbname).position)
            tween2.to({
                x: 0,
                y: 0,
                z: 0
            }, 1500)
            tween2.onUpdate(() => {
                this.scene.getObjectByName(dbname).position.set(this.scene.getObjectByName(dbname).position.x, this.scene.getObjectByName(dbname).position.y, this.scene.getObjectByName(dbname).position.z);
            })
            tween2.easing(TWEEN.Easing.Quadratic.InOut)
            tween1.delay(1000);
            tween1.start();
            tween1.chain(tween2);
            tween2.onComplete(() => {
                this.scene.getObjectByName(lj).visible = true;
            })
            // tween2.repeat(1);
        },
        guidao() {
            //轨道
            const guidaocaizhi = new THREE.MeshLambertMaterial({
                color: 0x232326,
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })
            const guidao = new THREE.BoxGeometry(30, 0.5, 0.5);//定义长方体
            const guidao1 = new THREE.Mesh(guidao, guidaocaizhi);
            return guidao1
        },
        guidaoche() {
            //受光照影响的材质MeshLambertMaterial
            const chezhecaizhi = new THREE.MeshLambertMaterial({
                color: 0x808080,
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })

            const dizuocaizhi = new THREE.MeshLambertMaterial({
                color: 0x24544A,
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })
            const zhuazicaizhi = new THREE.MeshLambertMaterial({
                color: 0x696969,
                // transparent:true,//是否透明
                // opacity:0.6//透明程度
                side: THREE.DoubleSide,
            })

            //轨道车建模


            //底座
            const chezhe = new THREE.BoxGeometry(6, 0.5, 0.5);//定义长方体
            const dizuo = new THREE.BoxGeometry(2, 0.5, 3);//定义长方体
            const dizuoxuan = new THREE.BoxGeometry(1.8, 0.3, 2.5);//定义长方体
            const chezhe1 = new THREE.Mesh(chezhe, chezhecaizhi);
            const chezhe2 = new THREE.Mesh(chezhe, chezhecaizhi);
            const dizuo1 = new THREE.Mesh(dizuo, chezhecaizhi);
            const dizuoxuan1 = new THREE.Mesh(dizuoxuan, dizuocaizhi);
            chezhe1.rotateY(Math.PI / 2);
            chezhe2.rotateY(Math.PI / 2);
            dizuo1.translateX(1);
            dizuoxuan1.translateX(1);
            dizuoxuan1.translateY(0.3);
            chezhe2.translateZ(2);

            //车门模型
            const chemen = new THREE.Shape();
            chemen.moveTo(0, 0);
            chemen.lineTo(0, 0.8);
            chemen.lineTo(0.6, 2);
            chemen.lineTo(2, 2);
            chemen.lineTo(2, 0);
            chemen.lineTo(0, 0);
            const window1 = new THREE.Path();
            window1.moveTo(0.2, 1);
            window1.lineTo(0.7, 1.8);
            window1.lineTo(1, 1.8);
            window1.lineTo(1, 1);
            window1.lineTo(0.2, 1);
            chemen.holes.push(window1);
            const chemencemian = new THREE.ExtrudeGeometry(chemen);
            const chemen1 = new THREE.Mesh(chemencemian, dizuocaizhi);
            chemen1.translateX(0.5);
            chemen1.translateZ(1);
            chemen1.rotateY(Math.PI / 2);

            //前面的抓手
            //抓手桶
            const zhuashou = new THREE.CylinderGeometry(0.3, 0.3, 1, 32, 1, true);
            const zhuashou1 = new THREE.Mesh(zhuashou, dizuocaizhi);
            zhuashou1.translateX(1);
            zhuashou1.translateY(0.6);
            zhuashou1.translateZ(1.6);
            zhuashou1.rotateX(Math.PI / 2);
            //爪子臂
            const zhuazibi = new THREE.CylinderGeometry(0.1, 0.1, 5);
            const zhuazibi1 = new THREE.Mesh(zhuazibi, zhuazicaizhi);
            zhuazibi1.translateX(1);
            zhuazibi1.translateY(0.6);
            zhuazibi1.translateZ(1.6);
            zhuazibi1.rotateX(Math.PI / 2);
            // zhuazi1.translateY();

            //爪子
            const zhuazi = new THREE.TorusGeometry(0.2, 0.05, 16, 3, 2.48564049348619);
            const zhuazi1 = new THREE.Mesh(zhuazi, zhuazicaizhi);
            const zhuazi2 = new THREE.Mesh(zhuazi, zhuazicaizhi);

            zhuazi1.translateX(0.92);
            zhuazi1.translateY(0.6);
            zhuazi1.translateZ(4.2);
            zhuazi1.rotateX(Math.PI / 2);
            zhuazi1.rotateZ(Math.PI / 1.5);

            zhuazi2.translateX(1.1);
            zhuazi2.translateY(0.6);
            zhuazi2.translateZ(4.2);
            zhuazi2.rotateX(Math.PI / 2);
            zhuazi2.rotateZ(Math.PI * 1.5);


            const dizuog = new THREE.Group();
            dizuog.name = 'dizuo';
            dizuog.add(chezhe1);
            dizuog.add(chezhe2);
            dizuog.add(dizuo1);


            const zhuazixuan = new THREE.Group();
            zhuazixuan.name = 'zhuazixuan';
            zhuazixuan.add(zhuazibi1);
            zhuazixuan.add(zhuazi1);
            zhuazixuan.add(zhuazi2);


            const dizuoxuang = new THREE.Group();
            dizuoxuang.name = 'dizuoxuan';
            dizuoxuang.add(dizuoxuan1);
            dizuoxuang.add(chemen1);
            dizuoxuang.add(zhuashou1);

            const xuanzhuan = new THREE.Group();
            xuanzhuan.name = 'xuanzhuan';
            xuanzhuan.add(zhuazixuan);
            xuanzhuan.add(dizuoxuang);

            const guidaoche = new THREE.Group();
            guidaoche.name = 'guidaoche';
            guidaoche.add(dizuog);
            guidaoche.add(xuanzhuan);

            const loader = new GLTFLoader ;
            loader.load('./未加工物料.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(2.5,2.5,2.5);
                model.translateX(-0.8);
                model.translateY(-0.5);
                model.translateZ(3);
                model.name = '车上零件';
                model.visible = false;
                zhuazixuan.add(model);
            }, (xhr)=>{
                if(xhr.loaded == 2148){
                    this.jiazai--;
                    console.log('车上物料加载完成'+this.jiazai);
                }
            })
            return guidaoche
        },
        zhuazizhuaqu(dbname) {
            let lj = null;
            if(dbname == "db1"){
                lj = "未加工物料1"
            };
            if(dbname == "db2"){
                lj = "未加工物料2"
            };
            if(dbname == "db3"){
                lj = "未加工物料3"
            };
            const tween = new TWEEN.Tween(this.scene.getObjectByName('zhuazixuan').position)
            tween.to({
                x: 0,
                y: 0,
                z: 2
            }, 1000)
            tween.onUpdate(() => {
                this.scene.getObjectByName('zhuazixuan').position.set(this.scene.getObjectByName('zhuazixuan').position.x, this.scene.getObjectByName('zhuazixuan').position.y, this.scene.getObjectByName('zhuazixuan').position.z);
            })
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.delay(1000);
            tween.start();
            tween.onComplete(() => {
                this.scene.getObjectByName(lj).visible = false;
                this.scene.getObjectByName("车上零件").visible = true;
                this.zhuazishousuo(dbname);
            })

        },
        zhuazishousuo(dbname) {
            const tween = new TWEEN.Tween(this.scene.getObjectByName('zhuazixuan').position)
            tween.to({
                x: 0,
                y: 0,
                z: 0
            }, 1000)
            tween.onUpdate(() => {
                this.scene.getObjectByName('zhuazixuan').position.set(this.scene.getObjectByName('zhuazixuan').position.x, this.scene.getObjectByName('zhuazixuan').position.y, this.scene.getObjectByName('zhuazixuan').position.z);
            })
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.delay(1000);
            tween.start();
            tween.onComplete(() => {
                this.yunxingdaogzt();
                this.dbguanbi(dbname);
            })
        },
        dizuoxuanzhuan1() {
            const tween = new TWEEN.Tween(this.scene.getObjectByName('xuanzhuan').rotation)
                .to({ y: Math.PI }, 3000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start()
                .delay(1000)
                .onComplete(() => {
                    this.zhuazifangzhi()
                })
        },
        dizuoxuanzhuan2() {
            const tween = new TWEEN.Tween(this.scene.getObjectByName('xuanzhuan').rotation)
                .to({ y: 0 }, 3000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start()
                .onComplete(() => {
                    this.donghuazhuangtai = 0;
                })
        },
        jiaozheng1() {
            const tween = new TWEEN.Tween(this.scene.getObjectByName('xuanzhuan').position)
                .to({ x: 2 }, 3000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start()

        },
        jiaozheng2() {
            const tween = new TWEEN.Tween(this.scene.getObjectByName('xuanzhuan').position)
                .to({ x: 0 }, 3000)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
        },
        yunxingdaogzt(){
            const tween = new TWEEN.Tween(this.scene.getObjectByName('guidaoche').position)
            tween.to({
                x: -11
            }, 2000)
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.onComplete(() => {
                this.dizuoxuanzhuan1();
                this.jiaozheng1();
            })
            tween.start();
        },
        zhuazifangzhi(){
            const tween = new TWEEN.Tween(this.scene.getObjectByName('zhuazixuan').position)
            tween.to({
                x: 0,
                y: 0,
                z: 2
            }, 1000)
            tween.onUpdate(() => {
                this.scene.getObjectByName('zhuazixuan').position.set(this.scene.getObjectByName('zhuazixuan').position.x, this.scene.getObjectByName('zhuazixuan').position.y, this.scene.getObjectByName('zhuazixuan').position.z);
            })
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.delay(1000);
            tween.start();
            tween.onComplete(() => {
                this.scene.getObjectByName("车上零件").visible = false;
                this.scene.getObjectByName("未加工物料4").visible = true;
                this.zhuazifangzhishousuo()
            })
        },
        zhuazifangzhishousuo(){
            const tween = new TWEEN.Tween(this.scene.getObjectByName('zhuazixuan').position)
            tween.to({
                x: 0,
                y: 0,
                z: 0
            }, 1000)
            tween.onUpdate(() => {
                this.scene.getObjectByName('zhuazixuan').position.set(this.scene.getObjectByName('zhuazixuan').position.x, this.scene.getObjectByName('zhuazixuan').position.y, this.scene.getObjectByName('zhuazixuan').position.z);
            })
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.delay(1000);
            tween.start();
            tween.onComplete(() => {
                this.dizuoxuanzhuan2();
                this.jiaozheng2();
            })
        },
        quzoucailiao1() {
            //触发取走材料动画
            if (this.donghuazhuangtai == 0) {
                this.donghuazhuangtai = 1;
                const tween = new TWEEN.Tween(this.scene.getObjectByName('guidaoche').position)
                tween.to({
                    x: -1
                }, 2000)
                tween.easing(TWEEN.Easing.Quadratic.InOut)
                tween.start();
                tween.onComplete(() => {
                    this.dbkaiqi("db1");
                })
            } else {
                alert("请先完成当前动画");
            }
        },
        quzoucailiao2() {
            //触发取走材料动画
            if (this.donghuazhuangtai == 0) {
                this.donghuazhuangtai = 1;
                const tween = new TWEEN.Tween(this.scene.getObjectByName('guidaoche').position)
                tween.to({
                    x: -11
                }, 2000)
                tween.easing(TWEEN.Easing.Quadratic.InOut)
                tween.start();
                tween.onComplete(() => {
                    this.dbkaiqi("db2");
                })
            } else {
                alert("请先完成当前动画");
            }
        },
        quzoucailiao3() {
            //触发取走材料动画
            if (this.donghuazhuangtai == 0) {
                this.donghuazhuangtai = 1;
                const tween = new TWEEN.Tween(this.scene.getObjectByName('guidaoche').position)
                tween.to({
                    x: -21
                }, 2000)
                tween.easing(TWEEN.Easing.Quadratic.InOut)
                tween.start();
                tween.onComplete(() => {
                    this.dbkaiqi("db3");
                })
            } else {
                alert("请先完成当前动画");
            }
        },
        jixxiebi1(){
            // 1：底座旋转      -180  180
            // 2：侧边杆	      -63   109.9
            // 3：主臂         -235   55
            const target = {
                joint_1: -160,
                joint_2: 40,
                joint_3: -20,
                joint_4: 0,
                joint_5: 0,
                joint_6: 0,
            }
            const tween = new TWEEN.Tween(this.paras1)
            tween.to(target, 2000)
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.onUpdate((object) => {
                for(const prop in this.k1.joints){
                    if(!this.k1.joints[prop].static){
                        this.k1.setJointValue(prop, object[prop])
                    }
                }
            })
            tween.start();
            tween.onComplete(() => {
                this.jixiebi1fangyeyaji();
            })

        },
        jixiebi1fangyeyaji(){
            // 1：底座旋转      -180  180
            // 2：侧边杆	      -63   109.9
            // 3：主臂         -235   55
            const target = {
                joint_1: 0,
                joint_2: 0,
                joint_3: 0,
                joint_4: 0,
                joint_5: 0,
                joint_6: 0,
            }
            const tween = new TWEEN.Tween(this.paras1)
            tween.to(target, 2000)
            tween.delay(1000);
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.onUpdate((object) => {
                for(const prop in this.k1.joints){
                    if(!this.k1.joints[prop].static){
                        this.k1.setJointValue(prop, object[prop])
                    }
                }
            })
            tween.start();
        },
        yeyaji(){
             console.log(this.scene.getObjectByName("Mesh_0"))
        }

    },
    mounted() {
        this.init();
        this.animate();
        this.listen();
    }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    /*隐藏滚动条*/
}

.el-header {
    background-color: #0066ff;
    // background-color: #cce0ff;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-main {
    background-color: #5a112c;
    color: #333;
    text-align: center;
    height: 100%;
    padding: 0;
}

.main {
    height: 100%;
}
</style>