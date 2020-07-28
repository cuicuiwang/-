/**
 * @flow
 * @Description:
 * @author cuixia wang
 * @date 2020-07-26
 */
class Container{
    constructor(value) {
        this._value=value;
    }
    static of(value){
        return new Container(value)
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}
class Maybe {
    constructor(x) {
        this._value=x
    }
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value===null||this._value===undefined
    }
    map(fn){
        return this.isNothing()?this:Maybe.of(fn(this._value))
    }

}
module.exports={Maybe,Container};
