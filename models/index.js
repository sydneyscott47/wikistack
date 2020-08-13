const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
},
//   { hooks: {
//     beforeValidate: function (page) {
//       if (page.title) {
//         return (page.slug = page.title.replace(/\s/g,'_').replace(/\W/g, ''))
//       } else {
//         return (slug = Math.random().toString(36).substring(2, 7))
//       }
//     }
//   }
// }
);

Page.beforeValidate((pageInstance, optionsObject) => {
  function generateSlug (title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
  pageInstance.slug = generateSlug(pageInstance.title)
})

//users table
const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = {
  db,
  Page,
  User,
};
