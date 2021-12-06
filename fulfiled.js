 /*
1) Лучше использовать базовый абстрактный Класс, как  шаблон для экземпляров UserService.

2) var следует избегать , это выстрел себе в ногу . 

3)Используем static там где это не нужно ,почемуто берем username ,password из класса но не из экземпляра объекта ,хотя передаем username,password в конструктор когда создаем экземпляр.

4) Публичные гетер username и своиства в конструкторе,  злоумышленики скажут вам спасибо!А вдруг установлено расширение которое ворует данные? По хорошему this.username,this.password нужно сделать приватными , примерно так this.#username ,this.#password   .

5) Проще и удобнее использовать axios

6) Функция не вернет значение полей а ноды .Лучше создать функцию отправки запроса и назвать ее userAuthenticationAction , более понятно и легче найти .

7) Достаточно использовать селектор по id , id уникален .

8)  Jquery точно не нужен для 10 строк кода .

9)Зачем нам геттер пароля? данные входа должны быть изолированы .

10)Для отправки полей используем Get вместо Post ,что чревато проблемами безопасность.

11) Делаем асинхронный запрос , но не используем event.preventDefault() врядли пользователь скажет вам спасибо!

12) не используем мощь ``

13) отстутствует валидация формы

14) alert нельзя использовать , нужно выводить ошибки через пользовательский интерфейс

15) API захардкожен , а если ссылка станет неактуальна? Или нужно указать другую ссылку для отдельного экземпляра?

можно долго продолжать, ниже представлен один из возможных вариантов как я бы реализовал данный таск .
Плюс в том что такая реализация безопаснее,проще,меньше ощибок .
Конечно это не идеально ,но хоть как то можно с этим работать , и пользователь вас не прокленет .
Ну и колеги , возможно ....))))
 */
  
 
 
import axios from 'axios' 
 
 const API_USER_LOGIN="https://examples.com/api/user/authenticate?username=";
 
 
 class AUserService {
     #username;
     #password;
    
   
    
    constructor(username, password,axios,apiURL) {

        if (this.constructor === AUserService) {
        throw new Error("Abstract Class cant be instantiated")

    }
     if (username===undefined||password===undefined) {
        throw new Error("look like your forget username||password")

    }
        this.#username = username;
        this.#password = password;
        
        this.#authenticateUser(axios,apiURL);
    }



      #authenticateUser(axios,apiURL) {

if(axios===undefined){
   throw new Error('Забыл прокинуть axios')
}

     if(this.#username===''&&this.#password===''){
               alert("нужен логин и пароль")
               //должен быть вместо алерт вывод UI с ошибкой а так же более богатая выборка проверки
 
    }else{

        axios.post(`${this.apiURL}${this.#username}&password=${this.#password}`, true).
        then(response=>document.location.href = '/home').
        catch(err => alert(err)
                       //должен быть вместо алерт вывод UI с ошибкой

        );
    }
        
    }

}
class UserService extends AUserService {

  otherUsefulMethod(){
   //do something u need extra

   }

}

function userAuthenticationAction(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    new UserService(username, password,axios,API_USER_LOGIN);//собирает данные и отправляет на сервер
 
}

 document.getElementById("login").addEventListener('click',(event)=>{
    userAuthenticationAction(event);
 
 });