import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';

const app = new Application();
const router = new Router();
let colores: String[] = [];

router.get('/', (ctx: Context) => {
  //Creamos un html para mostrar en el navegador con los colores, con estilos que tenemos en el array colores y un formulario para añadir más colores
  ctx.response.body = `
    <html>
        <head>
            <title>Colors</title>
        </head>
        <body>
            <h1>Colors</h1>
            <form action="/" method="post">
                <label for="color">Write a color:</label><br>
                <input type="text" id="color" name="color"><br>
                <input type="submit" value="Send">
            </form>
            <h2>Colors:</h2>
            <ul>
                ${colores
                  .map((color) => `<li style="color:${color}">${color}</li>`)
                  .join('')}
            </ul>
        </body>
    </html>
    `;
});

router.post('/', async (ctx: Context) => {
  const body = await ctx.request.body();
  const params = await body.value;
  const color = params.get('color');
  colores.push(color);
  ctx.response.redirect('/');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
console.log('Listening on http://localhost:8080/');
