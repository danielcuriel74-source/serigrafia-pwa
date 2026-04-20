import express, { Request, Response } from 'express';
import path from 'path';

type Role = 'admin' | 'editor' | 'op';

interface User {
	id: string;
	nombre: string;
	email: string;
	password: string;
	roles: Role[];
}

interface CreateUserBody {
	nombre: string;
	email: string;
	password: string;
}

interface AssignRoleBody {
	role: Role;
}

interface LoginBody {
	email: string;
	password: string;
}

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicPath = path.join(process.cwd(), 'public');

const rolesDisponibles: Role[] = ['admin', 'editor', 'op'];
const users: User[] = [
	{
		id: 'u_admin',
		nombre: 'Administrador',
		email: 'admin@serigrafia.local',
		password: 'admin123',
		roles: ['admin']
	},
	{
		id: 'u_editor',
		nombre: 'Editor',
		email: 'editor@serigrafia.local',
		password: 'editor123',
		roles: ['editor']
	},
	{
		id: 'u_op',
		nombre: 'Operador Lectura',
		email: 'op@serigrafia.local',
		password: 'op123',
		roles: ['op']
	}
];

app.use(express.json());
app.use(express.static(publicPath));

app.get('/login', (_req: Request, res: Response) => {
	res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/', (_req: Request, res: Response) => {
	res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/api', (_req: Request, res: Response) => {
	res.json({
		ok: true,
		mensaje: 'Serigrafia PWA API activa',
		endpoints: [
			'GET /login',
			'GET /api',
			'POST /auth/login',
			'GET /roles',
			'GET /users',
			'POST /users',
			'POST /users/:id/roles'
		]
	});
});

app.post('/auth/login', (req: Request<{}, {}, LoginBody>, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ error: 'email y password son obligatorios' });
		return;
	}

	const user = users.find(
		(item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password
	);

	if (!user) {
		res.status(401).json({ error: 'credenciales invalidas' });
		return;
	}

	res.json({
		ok: true,
		user: {
			id: user.id,
			nombre: user.nombre,
			email: user.email,
			roles: user.roles
		}
	});
});

app.get('/roles', (_req: Request, res: Response) => {
	res.json(rolesDisponibles);
});

app.get('/users', (_req: Request, res: Response) => {
	res.json(users);
});

app.post('/users', (req: Request<{}, {}, CreateUserBody>, res: Response) => {
	const { nombre, email, password } = req.body;

	if (!nombre || !email || !password) {
		res.status(400).json({ error: 'nombre, email y password son obligatorios' });
		return;
	}

	const existe = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
	if (existe) {
		res.status(409).json({ error: 'ya existe un usuario con ese email' });
		return;
	}

	const newUser: User = {
		id: `u_${Date.now()}`,
		nombre,
		email,
		password,
		roles: []
	};

	users.push(newUser);
	res.status(201).json({
		id: newUser.id,
		nombre: newUser.nombre,
		email: newUser.email,
		roles: newUser.roles
	});
});

app.post('/users/:id/roles', (req: Request<{ id: string }, {}, AssignRoleBody>, res: Response) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!rolesDisponibles.includes(role)) {
		res.status(400).json({ error: 'rol no valido' });
		return;
	}

	const user = users.find((item) => item.id === id);
	if (!user) {
		res.status(404).json({ error: 'usuario no encontrado' });
		return;
	}

	if (!user.roles.includes(role)) {
		user.roles.push(role);
	}

	res.json(user);
});

app.listen(port, () => {
	console.log(`Servidor listo en http://localhost:${port}`);
});