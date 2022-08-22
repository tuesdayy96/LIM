new Vue({
    el:'#wrap',
    data:{
        myProjects : ['#1','#2','#3','#4','#5'],
        isHome:true,
        isProject:false,
        isInfo:false,
        isContact:false
    },
    methods:{
        showHome:function(){
            if(!this.isHome){
                this.isHome = true;
                this.isProject = false;
                this.isInfo = false;
                this.isContact = false;
            }
        },
        showPro : function(){
            if(!this.isProject){
                this.isProject = true;
                this.isHome = false;
                this.isInfo = false;
                this.isContact = false;
            }
        },
        showInfo : function(){
            if(!this.isInfo){
                this.isInfo = true;
                this.isProject = false;
                this.isHome = false;
                this.isContact = false;
            }
        },
        showCon : function(){
            if(!this.isContact){
                this.isContact = true;
                this.isProject = false;
                this.isInfo = false;
                this.isHome = false;
            }
        }
    }
})