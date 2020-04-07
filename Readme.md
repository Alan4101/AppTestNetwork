###1. MongoDB
у файлі **db.js** підключення до **mongoDB**;
***
**fillingDatabase.js** заповнення колекцій в базі з файлу 
**users1.json**
***
**passport.config.js** - файл конфігурації для авторизації за допомогою passport.js
***
```
  model/user.model.js 
  
  const mongoose = require('mongoose');
      
      const UserModelSchema = new mongoose.Schema({
          name: String
          login: String,
          password: String,
          //заявки в друзі 
          //вхідні та вихідні
          //ідрузі
          friends:{
              incomeRequests: [],
              outcomeRequests:[],
              friends: []
          },
          //_id потінційних друзів
          freeUsers: [],
          icon: String,
      });
```
    
    
###2. Встановити всі залежності
###3. запуск 
```
    npm run dev
```

