
<template>
  <div>
    <worksCategory></worksCategory>
    <div class="workContainer">
      <workCard
        v-for="item in worksList.slice(
          (this.currentIndex - 1) * pageSize,
          this.currentIndex * pageSize
        )"
        :key="item.id"
        :work="item"
        @click.native="goInform(item)"
      ></workCard>
    </div>
    <div class="page">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next, total"
        :total="worksList.length"
        background
        :current-page="currentIndex"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import workCard from "@/components/WorkCard/workCard.vue";
import worksCategory from "@/components/Category/index.vue";
import { mapState } from "vuex";
export default {
  name: "worksPage",
  data() {
    return {
      currentIndex: 1,
      pageSize: 8,
      // workList: [
      //   {
      //     id: 1,
      //     author: "罗聪",
      //     opusName: "擂茶",
      //     opusIntroduce:
      //       "瑞金擂茶是将适量的大米加进芝麻、花生、绿豆、黄豆、茶叶、桔皮等擂制后，熬煮而成。擂茶风味独特，清香、微苦，呈灰绿色，稀糊浑浊，喝时加些香油，十分可口。瑞金人辛勤劳作后，喝上一碗擂茶顿时心清气爽，开胃解乏，擂茶有部分中草药，能起到解毒通气清凉的功效。做成的擂茶清香、味苦，呈灰绿色，稀糊浑浊。 \r\n中国人自古好茶，有言“茶余饭后”、“茶饭不思”、“柴米油盐酱醋茶”，多次将茶与粮食放在等同的地位上，可见茶的地位在国人眼中不容小觑。而瑞金擂茶却不同与茶，虽有“茶”的字样，却是地地道道的一道风味美食，可解馋养生。\r\n",
      //     opusType: "食品1",
      //     opusTitle: "赣南擂茶",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/bf9d7f1d876d416e8075a6d7a2130901.jpg",
      //     video: null,
      //     createTime: "2022-07-01",
      //     make: "将大米、芝麻、花生、绿豆、黄豆、茶叶、桔子分别擂成碎末（可根据自己的喜好决定分量，也可以添加其他食材），切少许葱花备用切少许葱花备用，放入水中煮沸，香飘满座的时候撒上葱花即可。 擂成的谷物碎末也可分成一小份一小份存储起来，嘴馋的时候再用开水冲泡，营养满分。",
      //     history:
      //       "擂茶的历史可谓源远流长。湘有“诸葛亮麾下进军湘中遭遇瘟疫，一老妪制擂茶祛疾”的故事。有关的文学记载也散见在一些古籍中，如黄升《玉林诗话》所载《肝胎族舍》一诗曰：”道旁草屋两三家，见客擂麻旋足茶。渐近中原语音好，不知淮水是天涯”。足证研麻，泡茶款客，是当时江南的一种风俗。此外，汪增棋先生引《都城纪胜，茶坊》”冬天兼卖擂茶”、”冬月添卖七宝擂茶”；又引”杭州人一天吃三十文木头”这一古语，说明历史上南宋偏安，人口众多，擂茶相当普及，甚至日耗大量木质枣擂杵。",
      //     origin:
      //       "擂茶源自北宋，至今已有千年历史。从选料、制作、冲泡，都别具特色。关于擂茶的起源，相传三国时刘备率领军队过洞庭湖，军中将士染上一种怪病，一路上病倒数千人。队伍扶病行军勉强支撑到了桃花江，再也无力前进，刘备只得下令就地驻扎，并派人四处寻医问药。医方找来不少，但均不见效。一日，一位老翁路过刘备军营，见军中将士纪律严明，很受感动，便主动献出祖传秘方“三生汤”（即生米、生姜、生茶叶）。当地老百姓找一来陶钵和木棒，并按照老翁的配料和制作方法，把生米、生姜、生茶叶捣碎，冲上开水让将士们饮用。其效果果然十分灵验，有病的迅速康复，无病的不再感染。",
      //   },
      //   {
      //     id: 2,
      //     author: "大哥",
      //     opusName: "采茶戏",
      //     opusIntroduce: "ni",
      //     opusType: "戏曲文化2",
      //     opusTitle: "赣南采茶戏",
      //     photo: null,
      //     video: null,
      //     createTime: "2022-07-10",
      //     make: "暂时还没有制作记录哦",
      //     history: "暂时还没有历史记录哦",
      //     origin: null,
      //   },
      //   {
      //     id: 3,
      //     author: "飞机",
      //     opusName: "大",
      //     opusIntroduce: "该作品还没有简介哦！",
      //     opusType: null,
      //     opusTitle: null,
      //     photo: null,
      //     video: null,
      //     createTime: "2022-07-14",
      //     make: "暂时还没有制作记录哦",
      //     history: "暂时还没有历史记录哦",
      //     origin: null,
      //   },
      //   {
      //     id: 6,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺6",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 7,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 8,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺8",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 9,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺9",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 10,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺10",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 11,
      //     author: "罗聪",
      //     opusName: "糖画",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺11",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      //   {
      //     id: 12,
      //     author: "罗聪",
      //     opusName: "123",
      //     opusIntroduce:
      //       "糖画是一种传统民间手工艺，以糖为材料来进行造型的。所用的工具仅一勺一铲，糖料一般是红、白糖加上少许饴糖放在炉子上用温火熬制，熬到可以牵丝时即可以用来浇铸造型了。在绘制造型时，由艺人用小汤勺舀起熔化了的糖汁，在石板上飞快地来回浇铸，画出造型，民间艺人的手上功夫便是造型的关键。当造型完成后，随即用小铲刀将糖画铲起，粘上竹签",
      //     opusType: "手工艺12",
      //     opusTitle: "倒糖人儿",
      //     photo:
      //       "https://feiyi-141.oss-cn-hangzhou.aliyuncs.com/2022-07-18/03d43f7a61634b0eab1c96fe498f3ac8.jpg",
      //     video: null,
      //     createTime: "2022-07-18",
      //     make: "在进行绘制糖人之前要先熬糖。熬糖前先准备一块大理石板，上面刷上油，油刷得要薄一些，这样可以防止糖粘在大理石板上。把一个铜锅放在火上，加入适量清水，再放入白砂糖。水与糖的比例是2比1。也就是说放两份水，放一份白砂糖。白砂糖放入以后要轻轻搅动一下，防止粘底。水温要逐渐升高，为的是利于糖溶解在水中。水开之后，把水蒸汽排到空气中。这时，糖液的温度逐渐变高，糖液中的水分逐渐减少。可以看到，糖液开始起大泡了。这是因为糖液中的水份少了，糖液的张力就大了。空气在排放的过程中，会在糖面上起一些大泡。这时候温度还不够。熬糖的合适温度是色泽稍微变黄，大泡变为小泡就差不多了。熬糖的目的是把糖液摊成糖片，以便在糖画绘制中使用。待颜色变黄，泡也变小了，火候就差不多了，趁热把它倒在大理石板上。糖液倒在大理石板上之后就会冷却、凝固。待糖液完全凝固后，把糖片切碎，收入盘中。质量好的糖块在常温下，半个月都不会溶化。这样熬制出的糖透明度较高，非常脆，不粘手，不滴油，不流液，才能作为绘制糖画的材料。在绘制糖画之前,首先要化糖。化糖就是把准备好的糖块放在糖锅内溶化。溶化糖要用小火，火大了糖就会焦。用温火将糖慢慢溶解，当糖完全溶解后就可以绘画了。做糖画的人是没有底稿的，画稿全在他的头脑里。做糖画必须胸有成竹，要趁热一气呵成，他们汲取了传统皮影制作的特征及雕刻技法，十二生肖喊来就来，张飞、赵云、花鸟鱼虫、飞禽走兽，随着缕缕糖丝的飘洒，便栩栩如生地呈现在你面前，再趁热粘上一根竹签，便大功告成。小孩举着腾云驾雾的飞龙或展翅欲飞的彩凤，对着阳光凝望，它是那么晶莹剔透，活灵活现，一时还舍不得吃，只轻轻用舌尖舔一下，又得意地向同伴炫耀，看得人眼馋口也馋。",
      //     history:
      //       "关于糖画，还有一个更加生动有趣的民间故事。据糖画老艺人白世云、樊德然、黎永成等回忆，相传唐代四川大诗人陈子昂在家乡时，很喜欢吃黄糖（蔗糖），不过他的吃法却与众不同。一代才子会首先将糖溶化，在清洁光滑的桌面上倒铸成各种小动物及各种花卉图案，待凝固后拿在手上，一面赏玩一面食用，自觉雅趣脱俗。后来陈子昂到京城长安游学求官，因初到京师人地两生，只做了一个小吏。闲暇无事时，便用从家乡带去的黄糖如法炮制，以度闲暇。一天，陈子昂正在赏玩自己的“作品”。谁知宫中太监带着小太子路过，小太子看见陈子昂手中的小动物，便吵着要。太监问明这些小动物是用糖做的时，便要了几个给小太子，欢欢喜喜回宫去了。谁知回宫后小太子将糖吃完了，哭着吵着还要，惊动了皇上，太监只好上前如实回禀。皇上听完原委，立即下诏宣陈子昂进宫，并要他当场表演。陈子昂便将带去的黄糖溶化，在光洁的桌面上倒了一枚铜钱，用一支竹筷粘上送到小太子手中，小太子立即破涕为笑。皇上心中一高兴，脱口说出“糖饼（儿）”两字，这就是“糖饼（儿）”这一名称的由来。由此陈子昂便得到了升迁，官至右拾遗。后来，陈子昂解衣归里后，为了纪念皇上的恩遇，同时也因闲居无聊，便收了几个徒弟传授此技。这些徒弟又传徒弟，并将它传向四方。有的干脆以此为业，走邨串乡做起糖饼儿生意来。这糖饼儿生意虽小，但因曾得到过皇帝的赏识，所以生意十分兴隆，学的人越来越多，并代代相传，这一技艺从此就流传下来。在一些大街小巷里经常会看见糖饼儿人的身影，周围围着一圈好奇的人。",
      //     origin:
      //       "尽管现在从事糖画行当的人数较过去有所下降，但是如今，糖画的这种魅力逐渐又得到了越来越多人的认可和关注，糖画艺人的地位也日益提升，以蔡树全为代表的一些艺人们通过各种形式被认可。蔡树全现为四川省民间文艺家协会常务理事。出生于四川糖艺世家的他，先后在国内各大都市及日本、德国、西班牙、新加坡等地作糖画表演。其作品及艺术成就在国内外近百家报刊、电视台作过宣传及专题报道，并被中国民间文艺家协会授予“民间工艺美术大师”，被联合国教科文组织授予“一级民间工艺美术家”，被中国民间工艺美术家委员会授予“国际民间工艺美术家”称号。",
      //   },
      // ],
    };
  },
  computed: {
    ...mapState({
      worksList: (state) => state.works.worksList,
    }),
  },
  methods: {
    changePage(val) {
      this.currentIndex = val;
      console.log(val);
    },
    goInform(item) {
      let params = {
        pageSize: this.pageSize,
        pageNo: this.currentIndex,
        opusId: item.id,
        email: this.$store.state.login.userdata?.email || "",
      };
      this.$store.dispatch("workInform", params);
      let location = { name: "WorkInform", params: params };
      this.$router.push(location);
    },
  },
  components: {
    workCard,
    worksCategory,
  },
  mounted() {
    this.$store.dispatch("worksList", { opusType: "", opusName: "" });
  },
};
</script>

<style lang="scss" scoped>
.workContainer {
  margin: 0 auto;
  width: 95%;
  min-height: 46rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: center;
  // align-items: center;
}
.page {
  margin: 0 auto;

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>