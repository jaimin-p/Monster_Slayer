new Vue({
el:"#app",
data:{
    playerHealth : 100,
    monsterHealth : 100,
    gameIsRunning : false,
    fightLog :[],
    ptom : 0,
    mtop : 0
},

methods : {

        startGame : function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100; 
            this.fightLog =[];
        },

        attack:function(){
            
            this.playerAttacks(3,10);
            if(this.checkStatus()){
                return;
            }

            this.monsterAttacks(5,12);
            this.checkStatus();

        },

        specialAttack:function(){
          
            this.playerAttacks(10,20);
            if(this.checkStatus()){
            return;
            }

            this.monsterAttacks(5,12);
            this.checkStatus();
        },

        heal:function(){
            if(this.playerHealth<=90)
            {
                this.playerHealth += 10;
            }
            else
            {
                this.playerHealth = 100;
            }
            this.fightLog.unshift({
                isPlayer : true,
                text : 'Player Heals  by 10% , Beware !! Monster is Attacking !!'
            });
            this.monsterAttacks(5,12);
        },

        giveUp:function(){
            if(confirm('Are you sure you want to Quit ?'))
            {
                this.gameIsRunning = false;
            }
        },

        playerAttacks:function(min,max){
            this.ptom = this.calculateDamage(min,max);
            this.monsterHealth -=  this.ptom;
            this.fightLog.unshift({
                isPlayer : true,
                text : 'Player hits Monster by ' +this.ptom +'%.'
            });
        },

        monsterAttacks : function (min,max){
             this.mtop = this.calculateDamage(min,max);
            this.playerHealth -=  this.mtop;
            this.fightLog.unshift({
                isPlayer : false,
                text : 'Monster hits Player by ' + this.mtop +'%.'
            });
        },

        calculateDamage :function(min,max){
            return Math.max(Math.floor(Math.random() * max) + 1 ,min ) ;
        },

        checkStatus : function (){
            if(this.monsterHealth<=0)
            {
                if(confirm("You Won !! Do you want to Start New Game ?"))
                {
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            
            else if(this.playerHealth <=0)
            {
                if(confirm("You Lost !! Do you want to Start New Game ?"))
                {
                    this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }

            return false;
        },

        addAnimation : function(){

            if(this.ptom > this.mtop)
            {
            $('#player').removeClass('bounce animated green').addClass('bounce animated green').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('bounce animated green');
              });

              $('#monster').removeClass('jello animated red').addClass('jello animated red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('jello animated red');
              }); 
            }
            else{
                $('#monster').removeClass('bounce animated green').addClass('bounce animated green').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('bounce animated green');
                  });

                $('#player').removeClass('jello animated red').addClass('jello animated red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('jello animated red');
                });
            }

        }


    
}



});