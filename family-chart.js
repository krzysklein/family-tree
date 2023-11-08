fetch("./data.json").then(r => r.json()).then(data => {
  const store = f3.createStore({
    data,
    node_separation: 290,
    level_separation: 150
  }),
    view = f3.d3AnimationView({
      store,
      cont: document.querySelector("#FamilyChart")
    }),
    Card = f3.elements.Card({
      store,
      svg: view.svg,
      card_dim: {
        w: 260,
        h: 70,
        text_x: 75,
        text_y: 15,
        img_w: 60,
        img_h: 60,
        img_x: 5,
        img_y: 5
      },
      card_display: [
        (d) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`,
        (d) => `${d.data["description"] || ""}`
      ],
      mini_tree: true,
      link_break: false
    })

  view.setCard(Card)
  store.setOnUpdate(props => view.update(props || {}))
  store.update.tree({ initial: true })
});
