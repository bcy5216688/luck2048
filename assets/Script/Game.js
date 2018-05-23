cc.Class({
    extends: cc.Component,

    properties: {
        squarePre: {
            default:null,
            type:cc.Prefab
        },
        squareBg: {
            default:null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.squares = [];
        for(var row = 0; row < 8; row++) {
            var squareRows = [];
            for(var col = 0; col < 6; col++){
                var squareNode = cc.instantiate(this.squarePre);
                squareRows.push(squareNode);
                var posX = 5 + squareNode.width/2 + (squareNode.width + 5)*col;
                var posY = 5 + squareNode.height/2 + (squareNode.height + 5)*row;
                squareNode.position = cc.p(posX,posY);
                squareNode.parent = this.squareBg;
           }
           this.squares.push(squareRows);
        }

    },

    scanAroundNum:function(num,row,col,arr,scanArr){
        if(this.squares[row][col] == null) {
            return;
        }
        if(scanArr == undefined){
            scanArr = new Array();
        }
        var isClear = false
        if(scanArr.indexOf(row+"#"+col)==-1){
            scanArr.push(row+"#"+col);
        }else{
            return;
        }
        // up
        if(row<4 && this.squares[row+1][col] != null){
            var nexNum = this.squares[row+1][col].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row+1,col,arr,scanArr);
                isClear = true;
            }
        }
        // down
        if(row>0 && this.squares[row-1][col] != null){
            var nexNum = this.squares[row-1][col].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row-1,col,arr,scanArr);
                isClear = true;
            }
        }
        // left
        if(col<4 && this.squares[row][col+1] != null){
            var nexNum = this.squares[row][col+1].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row,col+1,arr,scanArr);
                isClear = true;
            }
        }
        // right
        if(col>0 && this.squares[row][col-1] != null){
            var nexNum = this.squares[row][col-1].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row,col-1,arr,scanArr);
                isClear = true;
            }
        }
        if(!isClear){
            var curNum = this.squares[row][col].getComponent("Square").num;
            if(curNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
            }
        }
    },

    operateLogic:function(num,touchRow,touchCol){
        var arr = new Array();
        var scanArr = new Array();
        this.scanAroundNum(num,touchRow,touchCol,arr,scanArr);
        if(arr.length>=3){
            for(var index in arr){
                var row = arr[index].split("#")[0];
                var col = arr[index].split("#")[1];
                this.squares[row][col].getComponent("Square").destorySquare();
            }
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
