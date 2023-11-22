# Question Paper Generator

# Local Installation 

1. Clone this repository

```bash
    git clone https://github.com/Ayush-Vish/Reelo_Backend.git
```

2.Change the directory 

```bash
    cd Reelo_Backend
```

3. Install the dependencies

```bash
    npm install 
```

4. Make a .env file and copy content of .env.example

```bash
    touch .env
    cp .env.example .env
```

5. Run the Server 
   
```bash
    npm run dev
```
# API endpoints

1. POST - localhost:3010/api/papers/ - store Questions in database. (run this atleast 5 times for better results)

2. POST - localhost:3010/api/papers/create - make a Question paper.
   
```bash
    {
        "marks":100, 
        "easy":40,
        "medium":40, 
        "hard":20 

    }
```


