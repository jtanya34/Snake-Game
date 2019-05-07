import React ,{ Component } from 'react';
import  Snake  from './components/Snake';
import  Food  from './components/Food';
import Board  from './components/Board';
import GameInfo  from './components/GameInfo';
import { UP, DOWN, LEFT, RIGHT } from './helpers/constants';
import { Button ,Modal} from 'react-bootstrap';
import _ from 'lodash';

const getDefaultState=(boardSize,color)=>{
   
    return {
        size: {
            board: boardSize,
            player: 10,
        },
        position:{

            food:{
            top:Math.floor(Math.random()*(boardSize-10)),
            left:Math.floor(Math.random()*(boardSize-10)),
            color:'red'
            },
            snake:[{
                top:10,
                left:10,
                dir:RIGHT,
                color:color
            }]
        },
        snakeSpeed:1,
        timeElapsed:0,
        snakeIndex:0,
        playerScore: 0,
        baseScore:10,
        gameOver:false,
        highScore:0
        

    }
}



class Game extends Component{
constructor(props){
    super(props);
    const {boardSize,color}= props;
    this.state=getDefaultState(boardSize,color);
}



handleSnakeCollision = () => {
    const position=this.state.position.snake;
    const {playerScore,baseScore}=this.state
    const newSnake = this.increaseSnakeSize(position);

    this.setState({
        size:{
            ...this.state.size,
            player:this.state.size.player
        },
        position: {
            food:{
                top:Math.floor(Math.random()*(this.state.size.board-10)),
                left:Math.floor(Math.random()*(this.state.size.board-10)),
                color:'red'
                },
            snake: [...this.state.position.snake].concat(newSnake)
        },
        playerScore: playerScore + baseScore,
    });
}

handleDebugToggle = () => {
    this.setState({
        debug: this.debug.checked
    });
}

increaseSnakeSize=(position)=>{
    this.setState({
        snakeIndex: this.state.snakeIndex + 1
    });

    const newSnake = { 
        key: this.state.snakeIndex,
        dir:position[position.length-1].dir,
        color:'red',
    };

    const {  player } = this.state.size;
    const snake=position[position.length-1];

    switch(snake.dir) {
        case UP:
            newSnake.top = snake.top+player;
            newSnake.left = snake.left;
            break;
        case DOWN:
        newSnake.top = snake.top - player;
        newSnake.left = snake.left;
            break; 
        case LEFT:
        newSnake.top = snake.top;
        newSnake.left = snake.left+player;
            break;
        case RIGHT:
        newSnake.top = snake.top;
        newSnake.left = snake.left - player;
            break;
            default:
            break;
    }

    return newSnake;
}


startGame=()=>{
   this.snakeInterval = setInterval(this.updateSnakePositions, 50);
   this.timeInterval = setInterval(this.updateGame, 1000);

}

updateGame=()=>{
    const { timeElapsed } = this.state;
    this.updateTimeAndScore();
    if(timeElapsed>0){
        if (timeElapsed % 3 === 0) {
            this.incrementSnakeSpeed();
        }
    }
}

updateTimeAndScore = () => {
    const { timeElapsed} = this.state;

    this.setState({
        timeElapsed: timeElapsed + 1,
    });
}

incrementSnakeSpeed=()=>{
   const { snakeSpeed } =this.state;
    this.setState({
        snakeSpeed:parseFloat((snakeSpeed + 0.25).toFixed(2))
    })
}

gameOver=()=>{
    const { playerScore, highScore } = this.state;

    // clear intervals
    clearInterval(this.gameInterval); 
    clearInterval(this.snakeInterval);
    clearInterval(this.timeInterval);
    this.setState({
        highScore: playerScore > highScore ? playerScore : highScore,
        gameOver:true,
    });
    
}

resetGame = () => {
    const { boardSize,color } = this.props;
    const { debug } = this.state;
    

    // reset state
    this.setState({
        ...getDefaultState( boardSize,color ),
        // persist debug state and high scores
        debug,
      
    });
    // restart game
    this.startGame();

}
updateSnakePositions=()=>{
 
 const { snakeSpeed, position: { snake }}= this.state; 
        this.setState({
            position: {
                ...this.state.position,
                snake: snake.map(snake => {

                    if((_.inRange(snake.top,-10,0))||
                    (_.inRange(snake.top,this.state.size.board-10,this.state.size.board))||
                    (_.inRange(snake.left,this.state.size.board-10,this.state.size.board))||
                    (_.inRange(snake.left,-10,0))){
                        this.gameOver();
                    }

                    // based on direction, increment the correct value (top / left)
                    switch(snake.dir) {
                        case UP:
                       snake.top = snake.top-snakeSpeed;
                        break;
                        case DOWN:
                        snake.top = snake.top+snakeSpeed;
                            break;
                        case LEFT:
                        snake.left = snake.left-snakeSpeed;
                            break;
                        case RIGHT:
                        snake.left = snake.left+snakeSpeed;
                       
                            break;
                        }
                            return snake;
                    
                    })
            }
        
        });
       
    }
handleSnakePositions=(dirObj)=>{
 var snakes=[...this.state.position.snake]


 if(dirObj.dir !==snakes[0].dir){
              switch(dirObj.dir) {
                case UP:
                if (snakes[0].dir === DOWN){
                    let dump=Object.assign({},snakes[0]);
                    snakes[0].top=snakes[snakes.length-1].top;
                    snakes[0].left=snakes[snakes.length-1].left;
                    snakes[snakes.length-1].left=dump.left;
                    snakes[snakes.length-1].top=dump.top;

                }else if((snakes[0].dir===LEFT )){
                   for(let i=1;i<snakes.length;i++){
                       snakes[i].top=snakes[i].top+i*10;
                       snakes[i].left=snakes[i].left-i*10;
                   }
                }else if(snakes[0].dir===RIGHT){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top+i*10;
                        snakes[i].left=snakes[i].left+i*10;
                    }
                }
                break;
                case DOWN:
                if (snakes[0].dir=== UP){
                    let dump=Object.assign({},snakes[0]);
                    snakes[0].top=snakes[snakes.length-1].top;
                    snakes[0].left=snakes[snakes.length-1].left;
                    snakes[snakes.length-1].left=dump.left;
                    snakes[snakes.length-1].top=dump.top;
                }else if((snakes[0].dir===LEFT )){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top-i*10;
                        snakes[i].left=snakes[i].left-i*10;
                    }
                }else if(snakes[0].dir===RIGHT){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top-i*10;
                        snakes[i].left=snakes[i].left+i*10;
                    }
                }
                break;
                case LEFT:  
                if (snakes[0].dir === RIGHT){
                    let dump=Object.assign({},snakes[0]);
                    snakes[0].top=snakes[snakes.length-1].top;
                    snakes[0].left=snakes[snakes.length-1].left;
                    snakes[snakes.length-1].left=dump.left;
                    snakes[snakes.length-1].top=dump.top;
                }else if((snakes[0].dir===UP )){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top-i*10;
                        snakes[i].left=snakes[i].left+i*10;
                    }
                }else if(snakes[0].dir===DOWN){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top+i*10;
                        snakes[i].left=snakes[i].left+i*10;
                    }
                }
                break;
                case RIGHT:
                if (snakes[0].dir === LEFT){
                    let dump=Object.assign({},snakes[0]);
                    snakes[0].top=snakes[snakes.length-1].top;
                    snakes[0].left=snakes[snakes.length-1].left;
                    snakes[snakes.length-1].left=dump.left;
                    snakes[snakes.length-1].top=dump.top;
                }else if((snakes[0].dir===UP )){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top-i*10;
                        snakes[i].left=snakes[i].left-i*10;
                    }
                }else if(snakes[0].dir===DOWN){
                    for(let i=1;i<snakes.length;i++){
                        snakes[i].top=snakes[i].top+i*10;
                        snakes[i].left=snakes[i].left-i*10;
                    }
                }
                break;
                default:
                  break;
                }
            }


        this.setState({
            position: {
                ...this.state.position,
                snake:snakes.map(snake => {
                    snake.top= (snake.top) + (1*dirObj.top);
                    snake.left= (snake.left) + ( 1*dirObj.left);
                    snake.dir=dirObj.dir;
                    return snake;
                
                  })
            }
        });
       
    }


    style = () => {
        return {
            width: '85%',
            maxWidth: '600px',
            margin: '0 auto'
        };
    }

    render(){
      
        const { 
            playerScore,
            snakeIndex,
            timeElapsed,
            highScore
        } = this.state;
        return (
            <div style={this.style()}>
            <GameInfo 
                playerScore={playerScore} 
                timeElapsed={timeElapsed}
               highScore={highScore} />
                 <Board dimension={this.state.size.board} key={snakeIndex}>

                 <Food key={snakeIndex}
                 size={this.state.size.player}
                 position={this.state.position.snake[0]} 
                 food={this.state.position.food}
                 onCollide={this.handleSnakeCollision}/>

                 {(this.state.gameOver === true )&&
               
                    <Modal.Dialog style={{width:'inherit'}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Game Over</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Player Score: {playerScore}</p>
                            <p>High Score: {highScore}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.resetGame}>Restart</Button>
                        </Modal.Footer>
                        </Modal.Dialog>
                 }

                  {
                  this.state.position.snake.map(snake => 
                 <Snake key={snakeIndex}
                  info={snake}
                //   playerPosition={playerPos}
                  handleSnakePositions={this.handleSnakePositions} 
                   />
                  )
                  }

                  </Board>

                {/* {false && <p style={{ position: 'fixed', bottom: 0, left: 16 }}>Debug: <input type="checkbox" onChange={this.handleDebugToggle} ref={ n => this.debug = n }/></p>}
                {this.state.debug && <DebugState data={this.state} />} */}
            </div>
            
        )
    }
    componentDidMount() {
        this.startGame();
    }

    componentWillUnmount() {
       clearInterval(this.state.gameInterval);
       clearInterval(this.state.snakeInterval);
       clearInterval(this.state.timeInterval);
       
    }
}
export default Game;