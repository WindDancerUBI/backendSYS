import UserStore from "./userStore";

class Store {
    constructor(){
        this.userStore = new UserStore(this);
    }
}

export default Store