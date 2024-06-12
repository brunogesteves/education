kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:3001)
cd frontend
yarn start &
cd ..
cd backend/server
yarn start








upload fotos dos professores e editores
area para adionar e definir niveis
adicionar users para ser editor
editar user
arrumar bcrypt compare


