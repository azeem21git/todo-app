const express =require('express')
const path =require('path')


const app =express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

//let todos =["Bus","Train","Car"]
let todos = [
    { id: 1, task: "Bus" },
    { id: 2, task: "Train" },
    { id: 3, task: "Car" }
];

app.get('/api/todos',(req,res)=>{
    //res.send('./public/index.html' , {items:todos})
    res.json(todos)
})



app.delete('/api/delete/:id', (req, res) => {
    const id = parseInt(req.params.id); // URL-ல் வரும் ID-ஐ எண்ணாக மாற்றுகிறோம்
    
    // குறிப்பிட்ட ID இல்லாத மற்ற எல்லாப் பொருட்களையும் மட்டும் வைத்துக்கொள் (அதாவது அந்த ID நீக்கப்படும்)
    todos = todos.filter(item => item.id !== id);
    
    res.json({ success: true, message: "Deleted successfully" });
});



app.listen(3000,()=>{
    console.log("Server running on port 3000")
})