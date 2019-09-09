
$(document).ready(function () {

    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    canvas.attr("width",$(window).get(0).innerWidth);
    canvas.attr("height",$(window).get(0).innerHeight);
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });

  
    var n = 2 + Math.random() * 3;    // 设置初始的数量
   
    var initialRadius = canvasWidth / 100;  // 设定初始的半径大小
    
    var Branch = function() {
   
        this.x = canvasWidth / 2;
        this.y = canvasHeight;
        this.radius = 10;
        this.angle = Math.PI / 2;
    
        this.speed = canvasWidth/500;
        this.generation = 0;
        this.distance = 0;
    };

    var branches = new Array();


    for (var i = 0; i < n; i++) {

        branch = new Branch();
        
        branch.x = canvasWidth/2 - initialRadius + i * 2 * initialRadius / n;
        branch.radius = initialRadius;
    
        branches.push(branch);  // 将新的branch加入集合中去
    }


    function animate(){
   
        var branchesLength = branches.length;
        for(var i=0; i<branchesLength; i++) {

            var tmpbranches = branches[i];
        
            context.fillStyle = "#000";
            context.shadowColor = "#000";
            context.shadowBlur = 2;
            context.beginPath();
            context.moveTo(tmpbranches.x, tmpbranches.y);
            context.arc(tmpbranches.x, tmpbranches.y, tmpbranches.radius, 0, 2*Math.PI, true);
            context.closePath();
            context.fill();



            var deltaX = tmpbranches.speed * Math.cos(tmpbranches.angle);
            var deltaY = - tmpbranches.speed * Math.sin(tmpbranches.angle);
    
            tmpbranches.x += deltaX;
            tmpbranches.y += deltaY;
          
            tmpbranches.radius *= (0.99 - tmpbranches.generation/250);
    
            var deltaDistance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
    
            tmpbranches.distance += deltaDistance;
    
            if (tmpbranches.speed > tmpbranches.radius * 2){
                tmpbranches.speed = tmpbranches.radius * 2;
            }
   
            tmpbranches.angle += Math.random()/5 - 1/5/2;



            var splitChance = 0;

            if (tmpbranches.generation == 1)
                splitChance = tmpbranches.distance / canvasHeight - 0.2;

            else if (tmpbranches.generation < 3)
                splitChance = tmpbranches.distance / canvasHeight - 0.1;
    
            if (Math.random() < splitChance) {
               
                var n = 2 + Math.round(Math.random()*3);
                for (var i = 0; i < n; i++) {
                    var branch = new Branch();
                    branch.x = tmpbranches.x;
                    branch.y = tmpbranches.y;
                    branch.angle = tmpbranches.angle;
                    branch.radius = tmpbranches.radius * 0.9;
                    branch.generation++;
                    branch.fillStyle =tmpbranches.fillStyle;
    
                    branches.push(branch);
                }
                if (branches.length >70) {
                     branches.splice(0, 1);
                }
            }
        }

       
        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }

    }

    animate();

});


