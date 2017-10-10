class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
    this.config = config;
    this.states = config.states;
    this.arr = [config.initial];
    this.num = 0;
   }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.arr[this.num]; // место на котором я сейчас
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(state in this.states){
        this.num++;
       if(this.num < this.arr.length) {
          this.arr = [this.config.initial];
        }
        this.arr.push(state);
      } else{
        throw new exception;
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) { // случилось событие
      var cstate = this.states[this.getState()]; // получаю объект
      if(event in cstate.transitions){ // если событие есть в массиве событий
        this.changeState(cstate.transitions[event]); //передаю
      } else {
        throw new exception;
      }
    }

  /**
     * Resets FSM state to initial.
     */
    reset() {
      this.arr.push(this.config.initial);
      this.num++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    var arrofstates = [] ;
    var State;
    var Transition;
    if(event){
      for(State in this.states){
        for(Transition in this.states[State].transitions){
          if(event === Transition){
            arrofstates.push(State)
          }
        }
      }
    } else{
        for(var state2 in this.states){
        arrofstates.push(state2);
        }
      }
      return arrofstates;
    }


    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
  undo() {
      if(this.num > 0){
        this.num--;
        return true;
      } else{
        return false;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if((this.arr.length-1) > this.num){
        this.num++;
        return true;
      } else{
      return false;
  }
      }

    /**
     * Clears transition history
     */
    clearHistory() {
      var emptyarr = [];
      this.arr = emptyarr;
      this.num= 0;
    }
}

module.exports = FSM;
