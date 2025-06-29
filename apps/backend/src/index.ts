import express, { Request, Response } from "express";
import { jwtSecret, middleware } from "./middleware";
import cors from "cors";
import client from "@repo/db-config/client";
import jwt, { JwtPayload, PrivateKey, Secret } from "jsonwebtoken";
const app = express();
const port = 5000;

app.use(express.json());

const corsOptions = {
  origin: "https://100xforms.rahuldev.live",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

app.get("/hello", (req: Request, res: Response) => {
  res.send("hello123");
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = await client.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.json({
      msg: "user created ",
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "something went wrong" });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  try {
    const user = await client.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.json({
        msg: "User not found",
      });
    }

    if (user?.password !== req.body.password) {
      res.json({ msg: "password not match" });
    }
    const token = jwt.sign(user?.id as String, jwtSecret as Secret);

    res.json({
      msg: "user is authenticated ",
      token,
    });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
});

//create a form,authentication required
app.post("/form", middleware, async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const form = await client.form.create({
      data: {
        title: req.body.title || "Untitled",
        blocks: req.body.blocks || `[{"type":"paragraph"}]`,
        userId: req.userId,
      },
    });

    res.json({ msg: "form created", form });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Somthing went wrong" });
  }
});

//update the form
app.put("/form/:id", middleware, async (req: Request, res: Response) => {
  try {
    const formId = req.params.id;

    await client.form.update({
      data: {
        title: req.body.title || "Untitled",
        blocks: req.body.blocks,
        cover: req.body.cover,
        logo: req.body.logo,
        isPublished: req.body.isPublished,
        userId: req.userId,
      },
      where: {
        id: formId,
      },
    });

    res.json({ msg: "form updated" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Somthing went wrong" });
  }
});

// app.put("/form/:id", middleware, async (req: Request, res: Response) => {
//   try {
//     const formId = req.params.id;

//     await client.form.update({
//       data: {
//         title: req.body.title || "Untitled",
//         blocks: req.body.blocks,
//         cover: req.body.cover,
//         logo: req.body.logo,
//         isPublished: req.body.isPublished,
//         userId: req.userId,
//       },
//       where: {
//         id: formId,
//       },
//     });

//     res.json({ msg: "form updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ msg: "Somthing went wrong" });
//   }
// });

//update/edit a form authentication required
app.put("/form/:id", middleware, (req: Request, res: Response) => {});

//get all forms by the user
app.get("/forms", middleware, async (req: Request, res: Response) => {
  try {
    const forms = await client.form.findMany({
      where: {
        userId: req.userId,
      },
    });

    res.json({ msg: "All forms", forms });
  } catch (error) {
    res.json({ msg: "Something went wrong" });
  }
});

//delete a form, authentication required
app.delete("/form/:id", middleware, (req: Request, res: Response) => {});

//get a form /public url
app.get("/form/:id", async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.json({ msg: "no id" });
    }
    console.log(req.params.id);
    const form = await client.form.findFirst({
      where: {
        id: req.params.id,
      },
    });

    res.json({ msg: "form fetched", form });
  } catch (error) {
    res.json({ msg: "Somthing went wrong" });
  }
});

//create submission /public url
// app.put("/form/:id/submission", async (req: Request, res: Response) => {
//   try {
//     const form = await client.form.findFirst({
//       where: { id: req.params.id },
//       select: { submissions: true },
//     });

//     if (!form) {
//       res.status(404).json({ msg: "Form not found" });
//     }

//     const existingSubmissions = form?.submissions || "";
//     const newSubmission = req.body.submissions || "";

//     // console.log("exsisiting: ", existingSubmissions);
//     // console.log("new Submission: ", newSubmission);

//     const updatedSubmissions = existingSubmissions
//       ? `${existingSubmissions}\n${newSubmission}`
//       : newSubmission;

//     const neArr = updatedSubmissions.split("\n").map((arr: string) => {
//       return JSON.parse(arr);
//     });

//     const neArr1 = neArr.flat().map((item: any) => {
//       return item.name;
//     });

//     const submissionElement = [...new Set(neArr1)]; //Name.section

//     console.log(neArr1);
//     console.log(submissionElement);

//     const findVal = (i: number) =>
//       neArr
//         .flat()
//         .filter((item: any) => {
//           return item.name == submissionElement[i];
//           // return submissionElement.map((itesm) => {
//           //   return item.name == itesm;
//           // });
//         })
//         .map((item: any) => {
//           return item.value;
//         });

//     let obj1 = [];

//     for (let i = 0; i < submissionElement.length; i++) {
//       obj1.push({
//         title: submissionElement[i],
//         values: findVal(i),
//       });
//     }

//     // Object.assign(obj,{submissionElement:findVal})
//     // let keyName = submissionElement[0];
//     // obj[keyName] = findVal;

//     console.log("Hi ", findVal);

//     await client.form.update({
//       where: { id: req.params.id },
//       data: { submissions: updatedSubmissions },
//     });

//     res.json({ msg: "Submission done" });
//   } catch (error) {
//     console.error("Submission error:", error);
//     res.status(500).json({ msg: "Something went wrong" });
//   }
// });

app.put("/form/:id/submission", async (req: Request, res: Response) => {
  try {
    const form = await client.form.findFirst({
      where: { id: req.params.id },
      select: { submissions: true },
    });

    if (!form) {
      res.status(404).json({ msg: "Form not found" });
    }

    const newSubmission = req.body.submissions || "";

    const inputArray = JSON.parse(newSubmission);

    const newArr = JSON.parse(newSubmission).map((item: any) => {
      return item.name;
    });

    const output = newArr.reduce((acc: any, field: string) => {
      acc[field] = null;
      return acc;
    }, {});

    inputArray.forEach((item: any) => {
      output[item.name] = item.value;
    });

    let allSubmissions =
      form?.submissions === null
        ? JSON.stringify([output])
        : JSON.stringify([...JSON.parse(form?.submissions as string), output]);

    await client.form.update({
      where: {
        id: req.params.id,
      },
      data: {
        submissions: allSubmissions,
      },
    });
    res.json({ msg: "Submission done" });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

app.get("/form/:id/submission", async (req: Request, res: Response) => {
  try {
    const allSubmission = await client.form.findFirst({
      where: {
        id: req.params.id,
      },
      select: {
        submissions: true,
      },
    });
    res.json({ msg: "All submissions", submissions: allSubmission });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
