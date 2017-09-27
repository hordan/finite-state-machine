class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = config;
      this.statesArray = [config.initial];
      this.index = 0;
      this.states = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.statesArray[this.index];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if(state in this.states){
        this.index++;
        if(this.index < this.statesArray.length) {
        //  this.statesArray = this.statesArray.slice(0, this.index);
          this.statesArray = [this.config.initial];
        }
        this.statesArray.push(state);
      } else {
        throw new Error("This state doesn't found");
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var currentState = this.states[this.getState()];
        if(event in currentState.transitions){
        this.changeState(currentState.transitions[event]);
        } else {
          throw new Error('Event is undefined');
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.statesArray.push(this.config.initial);
      this.index++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var arrayOfStates = [];
      if(event){
        for(var state in this.states){
          for (var transition in this.states[state].transitions){
            if (transition === event){
               arrayOfStates.push(state);
            }
          }
        }
      } else{
        for(var state in this.states){
          arrayOfStates.push(state);
        }
      }
      return arrayOfStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.index > 0){
        this.index--;
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
      if(this.index < this.statesArray.length - 1){
        this.index++;
        return true;
      } else{
        return false;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      var state = this.statesArray[this.index];
      this.statesArray = [state];
      this.index = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
