// 素材データ
// 新しい素材を追加するときは、この配列に1件追加してください。
// image は images/ からの相対パスです。
const CATEGORIES = [{"name": "その他", "slug": "other", "description": "その他の素材"}, {"name": "モンスター", "slug": "monster", "description": "モンスター・魔物"}, {"name": "技能", "slug": "skills", "description": "技能・能力"}, {"name": "空・天候", "slug": "sky-weather", "description": "空・天候"}, {"name": "建物・場所", "slug": "places", "description": "建物・場所"}, {"name": "施設・サービス", "slug": "services", "description": "施設・サービス"}, {"name": "乗り物", "slug": "vehicles", "description": "乗り物"}, {"name": "植物", "slug": "plants", "description": "植物"}, {"name": "食べ物", "slug": "food", "description": "食べ物"}, {"name": "人間", "slug": "people", "description": "人間"}, {"name": "装備", "slug": "equipment", "description": "装備"}, {"name": "動物", "slug": "animals", "description": "動物"}, {"name": "武器", "slug": "weapons", "description": "武器"}, {"name": "物", "slug": "objects", "description": "物"}];

const MATERIALS = [
  // 例:
  // { name: "イヌ", category: "動物", image: "images/animals/イヌ.png", tags: ["犬","動物","哺乳類"] },
  {
  id: "inu",
  name: "イヌ（飼い犬）",
  category: "動物",
  image: "images/animals/イヌ（飼い犬）.png",
  tags: ["犬", "動物"]
},
];
