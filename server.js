const app = require('./app');

PORT = process.env.PORT || 8080

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});   