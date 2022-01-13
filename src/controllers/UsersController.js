import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class UsersController {

    async index(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            console.error(500);
            return res.status(500).json("Internal server error.");
        }
    }
    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) {
                return res.status(422).json({ message: `User ${email} already exists.` });
            }

            //bcryptjs password
            const paswordEncrypted = await createPasswordHash(password);

            const newUser = await User.create({ email, password: paswordEncrypted });
            return res.status(201).json(newUser);

        } catch (error) {
            console.error(500);
            return res.status(500).json("Internal server error.");
        }
    }
    async read(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json();
            return res.json(user);
        } catch (error) {
            console.error(500);
            return res.status(500).json("Internal server error.");
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findById(id);
            if (!user) return res.status(404).json();
            const paswordEncrypted = await createPasswordHash(password);
            await user.updateOne({ email, password: paswordEncrypted });
            return res.status(200).json();
        } catch (error) {
            console.error(500);
            return res.status(500).json("Internal server error.");
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json();
            await user.deleteOne();
            return res.status(200).json();
        } catch (error) {
            console.error(500);
            return res.status(500).json("Internal server error.");
        }
    }
}
export default new UsersController();