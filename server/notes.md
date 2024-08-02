npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,phoneNumber:string

npx sequelize-cli model:generate --name Article --attributes title:string,description:text,imageUrl:string,writer:string

npx sequelize seed:create --name User