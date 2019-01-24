// Task 1
/**
 * function addItemInfoDecorator - ф-ия-декоратор для метода getItemInfo, возвращает поля date(дата вызова ф-ии) и info
 * (информацию о имени и цене продукта) 
 * @param target 
 * @param method 
 * @param descriptor 
 */
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let originFunc = descriptor.value;
    descriptor.value = function () {
        let origResult =  originFunc.apply(this);
        origResult.data = new Date().toDateString();
        origResult.info = this.name +' - ' + this.price;
        return origResult;
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

// Task 2
/**
 * function userDecorator(type) - декоратор класса, добавляет поля date и type. 
 */
function userDecorator(type) {
    return function (targetClass: any) {
        return class {
            public date: string = new Date().toDateString();
            public type: string = type;
        }
    }
}

@userDecorator('user')
class User {

}

// Task 3
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews() {} // method
    }
}

namespace Ukraine {
    export interface INews2 {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    
    export class NewsService2 {
        protected apiurl: string = 'https://news_api_2_url'
        public getNews() {} 
        public addToFavorite() {} 
    }
}

// Task 4
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
    doTasks(): void {
        
    }    
    createApp(): void {
    
    }

    createArchitecture() {
        console.log('Create Architecture');
    }
}

applyMixin(Senior, [Junior, Middle]);

function applyMixin(targetClass: any, baseClasses: any[]) {
    baseClasses.forEach((base) => {
        Object.getOwnPropertyNames(base.prototype).forEach((property) => {
            targetClass.prototype[property] = base.prototype[property];
        });
    });
}