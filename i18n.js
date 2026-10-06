// All UI copy lives here. Columns: Portuguese | English | Spanish | Simplified Chinese.
// Product artwork keeps its original decorative lettering; controls and instructions translate.
const COPY = Object.fromEntries(`
Idioma|Language|Idioma|语言
Seu mundo de fofura!|Your world of cuteness!|¡Tu mundo de ternura!|你的软萌世界！
Brinque, crie e descubra novos amigos Squish.|Play, create and discover new Squish friends.|Juega, crea y descubre nuevos amigos Squish.|玩耍、创作，认识新的捏捏朋友。
Vamos brincar!|Let's play!|¡Vamos a jugar!|一起玩吧！
Minha coleção|My collection|Mi colección|我的收藏
Montar no app|Create in the app|Crear en la app|在应用中制作
Fazer em casa|Make at home|Hacer en casa|在家制作
Hora de brincar!|Time to play!|¡Hora de jugar!|游戏时间！
Trocar amigo|Change friend|Cambiar amigo|更换朋友
Brinque no seu ritmo. Cada rodada ajuda a abrir sua coleção.|Play at your own pace. Each round grows your collection.|Juega a tu ritmo. Cada ronda amplía tu colección.|按自己的节奏玩，每一轮都能丰富收藏。
Escolha a brincadeira|Choose a game|Elige un juego|选择游戏
Caça aos brilhos|Sparkle hunt|Caza de destellos|寻找闪光
Memória fofinha|Cute memory|Memoria adorable|萌萌记忆
Pegue 8 brilhos! Você também pode apertar seu Squish.|Catch 8 sparkles! You can squeeze your Squish too.|¡Atrapa 8 destellos! También puedes apretar tu Squish.|收集 8 个闪光！也可以捏捏你的朋友。
Apertar Squish|Squeeze Squish|Apretar Squish|捏一下
Pegar brilho|Catch sparkle|Atrapar destello|收集闪光
Brilhos coletados|Sparkles collected|Destellos recogidos|已收集的闪光
{n} de 8 brilhos|{n} of 8 sparkles|{n} de 8 destellos|{n} / 8 个闪光
Que brilho! +20 pontos|So sparkly! +20 points|¡Qué brillo! +20 puntos|闪闪发光！+20 积分
Seu amigo adorou brincar com você.|Your friend loved playing with you.|A tu amigo le encantó jugar contigo.|你的朋友很喜欢和你一起玩。
Brincar outra vez|Play again|Jugar otra vez|再玩一次
Ver meus amigos|See my friends|Ver mis amigos|查看朋友
Vire duas cartas e encontre os 4 pares. Pode tentar quantas vezes quiser!|Flip two cards and find all 4 pairs. Try as often as you like!|Gira dos cartas y encuentra los 4 pares. ¡Puedes intentarlo tantas veces como quieras!|翻开两张卡片，找到 4 对。想尝试多少次都可以！
{n} de 4 pares|{n} of 4 pairs|{n} de 4 pares|{n} / 4 对
Todos os pares! +30 pontos|All pairs found! +30 points|¡Todos los pares! +30 puntos|全部配对！+30 积分
Uma memória cheia de fofura.|A memory full of cuteness.|Una memoria llena de ternura.|满满的可爱记忆。
Montar este amigo|Create this friend|Crear este amigo|制作这位朋友
Ganhe pontos brincando ou criando em casa. Os amigos desbloqueados ficam com você, mesmo depois de gastar pontos na loja.|Earn points by playing or crafting at home. Unlocked friends stay with you even after spending points in the shop.|Gana puntos jugando o creando en casa. Los amigos desbloqueados se quedan contigo aunque gastes puntos en la tienda.|通过游戏或在家制作赚取积分。即使在商店花掉积分，已解锁的朋友也会保留。
{n} de 6 amigos na coleção|{n} of 6 friends collected|{n} de 6 amigos en la colección|已收集 {n} / 6 位朋友
Faltam {n} pontos para conhecer {name}.|Earn {n} more points to meet {name}.|Gana {n} puntos más para conocer a {name}.|再赚 {n} 积分就能认识 {name}。
Você encontrou todos os amigos! Agora invente novos Squishes.|You found every friend! Now invent new Squishes.|¡Encontraste a todos los amigos! Ahora inventa nuevos Squishes.|你找到所有朋友了！现在来创造新的捏捏玩具吧。
Brincar, montar e imprimir|Play, create and print|Jugar, crear e imprimir|玩耍、制作和打印
Desbloqueia com {n} pontos ganhos|Unlocks at {n} earned points|Se desbloquea con {n} puntos ganados|累计 {n} 积分可解锁
← Minha coleção|← My collection|← Mi colección|← 我的收藏
Brincar com este amigo|Play with this friend|Jugar con este amigo|和这位朋友玩
Imprimir e montar em casa|Print and make at home|Imprimir y montar en casa|打印并在家制作
Ver passo a passo|See the steps|Ver paso a paso|查看制作步骤
← Meu amigo|← My friend|← Mi amigo|← 我的朋友
Um amigo do jogo para montar em casa!|A game friend to make at home!|¡Un amigo del juego para hacer en casa!|把游戏里的朋友带回家制作！
Jogar|Play|Jugar|游戏
Um amigo macio para começar sua aventura.|A soft friend to start your adventure.|Un amigo suave para empezar tu aventura.|陪你开启冒险的软萌朋友。
Uma nuvem que adora brincar de esconder.|A cloud who loves hide-and-seek.|Una nube que adora jugar al escondite.|喜欢捉迷藏的云朵。
Uma estrelinha que coleciona ideias brilhantes.|A little star who collects bright ideas.|Una estrellita que colecciona ideas brillantes.|收集闪亮点子的小星星。
Espalha flores e carinho por onde passa.|Spreads flowers and kindness everywhere.|Reparte flores y cariño por donde pasa.|走到哪里，都带着鲜花与温暖。
Adora inventar receitas e fazer caretas.|Loves inventing recipes and making funny faces.|Le encanta inventar recetas y hacer muecas.|喜欢发明食谱和做鬼脸。
Guarda todas as cores de um pôr do sol.|Keeps all the colors of a sunset.|Guarda todos los colores de un atardecer.|收藏着晚霞的所有颜色。
Novo amigo: {name}!|New friend: {name}!|¡Nuevo amigo: {name}!|新朋友：{name}！
Mais uma brincadeira para sua coleção!|Another game for your collection!|¡Otra partida para tu colección!|又为收藏增添一轮游戏！
Você ganhou {n} pontos!|You earned {n} points!|¡Ganaste {n} puntos!|你获得了 {n} 积分！
Carta {n} • {state}|Card {n} • {state}|Carta {n} • {state}|卡片 {n} • {state}
par encontrado|pair found|par encontrado|已配对
virar|flip|girar|翻开
Idioma e instalação|Language & installation|Idioma e instalación|语言与安装
Ganhe pontos e colecione materiais virtuais.|Earn points and collect virtual materials.|Gana puntos y colecciona materiales virtuales.|赚取积分，收集虚拟材料。
Descubra os materiais para suas criações.|Discover materials for your creations.|Descubre materiales para tus creaciones.|了解制作所需的材料。
Comece com um panda fofinho.|Start with a cute panda.|Empieza con un panda adorable.|从可爱熊猫开始。
Pink Guava Butter|Pink Guava Butter|Mantequilla de guayaba rosa|粉红番石榴黄油
Strawberry Milk|Strawberry Milk|Leche de fresa|草莓牛奶
Peach Juice|Peach Juice|Zumo de melocotón|桃汁
Melon Cube|Melon Cube|Cubo de melón|蜜瓜方块
Blueberry Yogurt|Blueberry Yogurt|Yogur de arándanos|蓝莓酸奶
Lemon Candy|Lemon Candy|Caramelo de limón|柠檬糖
Watermelon Gum|Watermelon Gum|Chicle de sandía|西瓜口香糖
Mango Cream|Mango Cream|Crema de mango|芒果奶油
Grape Soda|Grape Soda|Refresco de uva|葡萄汽水
Cherry Cereal|Cherry Cereal|Cereales de cereza|樱桃麦片
Banana Pudding|Banana Pudding|Pudín de plátano|香蕉布丁
Kiwi Cookies|Kiwi Cookies|Galletas de kiwi|猕猴桃饼干
Orange Jelly|Orange Jelly|Gelatina de naranja|橙子果冻
Pineapple Snack|Pineapple Snack|Bocadito de piña|菠萝零食
Apple Tea|Apple Tea|Té de manzana|苹果茶
Coconut Milk|Coconut Milk|Leche de coco|椰奶
Donut Box|Donut Box|Caja de dónuts|甜甜圈盒
Cupcake Mix|Cupcake Mix|Mezcla de cupcakes|纸杯蛋糕粉
Rainbow Candy|Rainbow Candy|Caramelo arcoíris|彩虹糖
Vanilla Cream|Vanilla Cream|Crema de vainilla|香草奶油
Molde {name}|Template: {name}|Plantilla: {name}|模板：{name}
Escolha seu idioma para começar.|Choose your language to get started.|Elige tu idioma para comenzar.|选择语言开始使用。
Testar como aplicativo|Install on your phone|Instalar en tu móvil|安装到手机
Instale o Squish Funny na tela inicial do celular.|Add Squish Funny to your home screen.|Añade Squish Funny a tu pantalla de inicio.|将 Squish Funny 添加到主屏幕。
Instalar|Install|Instalar|安装
Create. Squish. Smile.|Create. Squish. Smile.|Crea. Aprieta. Sonríe.|创作、捏捏、微笑。
Nível 1 • Iniciante|Level 1 • Beginner|Nivel 1 • Principiante|等级 1 • 新手
O que você quer fazer hoje?|What do you want to make today?|¿Qué quieres hacer hoy?|今天想做什么？
Crie, cumpra desafios e descubra novos Squishes.|Create, complete challenges and discover new Squishes.|Crea, completa desafíos y descubre nuevos Squishes.|创作、完成挑战，发现新的捏捏玩具。
Criar um Squish|Make a Squish|Crear un Squish|制作捏捏玩具
Escolha um modelo e faça passo a passo.|Choose a model and follow the steps.|Elige un modelo y sigue los pasos.|选择款式，按步骤制作。
Desafios|Challenges|Desafíos|挑战
Ganhe pontos e desbloqueie modelos.|Earn points and collect virtual materials.|Gana puntos y colecciona materiales virtuales.|赚取积分，收集虚拟材料。
Materiais|Materials|Materiales|材料
Veja o que precisa e onde encontrar.|Discover materials for your creations.|Descubre materiales para tus creaciones.|了解制作所需的材料。
Explorar|Explore|Explorar|探索
Descubra ideias novas para criar.|Find new ideas to make.|Descubre nuevas ideas para crear.|发现新的创作灵感。
Moldes para imprimir|Printable templates|Plantillas para imprimir|可打印模板
Escolha um desenho pronto e imprima.|Choose a ready-made design and print.|Elige un diseño e imprímelo.|选择现成设计并打印。
Crie seu próprio squish, personalize e gere o molde para imprimir.|Customize your Squish and make a printable template.|Personaliza tu Squish y genera una plantilla.|自定义捏捏玩具，生成打印模板。
PLUS • DEMO|PLUS • DEMO|PLUS • DEMO|PLUS • 演示
← Voltar|← Back|← Volver|← 返回
Crie seu Squish|Make your Squish|Crea tu Squish|制作你的捏捏玩具
Escolha um modelo para começar. Agora tem várias frutas e outras ideias fofas.|Choose a model: fruit, food and cute shapes.|Elige un modelo: frutas, comida y formas adorables.|选择款式：水果、美食和可爱造型。
Frutas|Fruit|Frutas|水果
Morango fofo|Cute strawberry|Fresa adorable|可爱草莓
Melancia kawaii|Kawaii watermelon|Sandía kawaii|可爱西瓜
Uvinha fofa|Cute grapes|Uvas adorables|可爱葡萄
Banana sorridente|Smiling banana|Plátano sonriente|微笑香蕉
Laranja kawaii|Kawaii orange|Naranja kawaii|可爱橙子
Limão fofo|Cute lemon|Limón adorable|可爱柠檬
Maçã feliz|Happy apple|Manzana feliz|快乐苹果
Pera kawaii|Kawaii pear|Pera kawaii|可爱梨子
Abacaxi fofo|Cute pineapple|Piña adorable|可爱菠萝
Cerejinhas|Little cherries|Cerecitas|小樱桃
Pêssego fofo|Cute peach|Melocotón adorable|可爱桃子
Kiwi kawaii|Kawaii kiwi|Kiwi kawaii|可爱猕猴桃
Manga fofa|Cute mango|Mango adorable|可爱芒果
Mirtilos|Blueberries|Arándanos|蓝莓
Comidas e fofinhos|Food & cuties|Comida y ternuras|美食与萌物
Hambúrguer|Burger|Hamburguesa|汉堡
Butter|Butter|Mantequilla|黄油
Dumpling|Dumpling|Empanadilla|饺子
Donut fofo|Cute donut|Dónut adorable|可爱甜甜圈
Chocolate kawaii|Kawaii chocolate|Chocolate kawaii|可爱巧克力
Caixinha de leite|Milk carton|Cartón de leche|牛奶盒
Nuvem kawaii|Kawaii cloud|Nube kawaii|可爱云朵
Fácil|Easy|Fácil|简单
Médio|Medium|Medio|中等
Prefiro imprimir|I'd rather print|Prefiero imprimir|我想直接打印
Use um molde pronto, sem desenhar|Use a ready-made template, no drawing needed|Usa una plantilla sin dibujar|使用现成模板，无需绘画
← Modelos|← Models|← Modelos|← 款式
Você vai precisar|You will need|Necesitarás|准备材料
Papel, fita transparente, tesoura sem ponta, canetinhas e enchimento macio. Crianças devem pedir ajuda a um adulto para recortar.|Paper, clear tape, blunt-tip scissors, markers and soft filling. Children should ask an adult to help with cutting.|Papel, cinta transparente, tijeras de punta redonda, rotuladores y relleno suave. Los niños deben pedir ayuda a un adulto para recortar.|纸、透明胶带、圆头剪刀、彩笔和柔软填充物。儿童剪裁时应请成人帮忙。
Preciso dos materiais|See materials|Ver materiales|查看材料
1. Desenhe|1. Draw|1. Dibuja|1. 绘画
Desenhe duas peças do mesmo tamanho e espelhe o verso para alinhar as bordas.|Draw two matching pieces, mirroring the back so the edges line up.|Dibuja dos piezas iguales y refleja el reverso para alinear los bordes.|画出两片相同大小的轮廓，将背面镜像翻转以对齐边缘。
Desenhe o contorno de {name} duas vezes, espelhando o verso. Deixe espaço para a fita.|Draw the outline of {name} twice, mirroring the back. Leave room for tape.|Dibuja el contorno de {name} dos veces, reflejando el reverso. Deja espacio para la cinta.|画两片{name}的轮廓，背面镜像翻转，预留贴胶带的位置。
2. Decore|2. Decorate|2. Decora|2. 装饰
Pinte e desenhe o rostinho. Cubra com fita transparente antes de recortar para proteger o papel.|Color and draw the face. Cover with clear tape before cutting to protect the paper.|Colorea y dibuja la cara. Cubre con cinta transparente antes de recortar para proteger el papel.|涂色并画上表情。剪裁前覆盖透明胶带，保护纸张。
3. Monte|3. Assemble|3. Monta|3. 组装
Recorte as duas peças. Alinhe frente e verso e una as bordas com fita, deixando uma abertura de 2 cm.|Cut out both pieces. Align front and back and tape the edges, leaving a 2 cm opening.|Recorta ambas piezas. Alinea las caras y une los bordes con cinta, dejando una abertura de 2 cm.|剪下两片，对齐正反面，用胶带封边，留出 2 厘米开口。
4. Encha|4. Fill|4. Rellena|4. 填充
Coloque pouco enchimento macio, sem compactar. Feche a abertura com fita e aperte devagar para não rasgar.|Add a little soft filling without packing it tightly. Tape the opening shut and squeeze gently to avoid tearing.|Añade un poco de relleno suave sin compactar. Cierra con cinta y aprieta despacio para no rasgarlo.|放入少量柔软填充物，不要压实。用胶带封口，轻轻挤压，避免撕破。
Consegui fazer!|I made it!|¡Lo conseguí!|我做好了！
Complete missões para ganhar pontos.|Complete missions to earn points.|Completa misiones para ganar puntos.|完成任务，赚取积分。
Desafio do dia|Daily challenge|Desafío del día|每日挑战
Faça um Squish inspirado em uma comida.|Make a food-inspired Squish.|Haz un Squish inspirado en comida.|制作美食主题的捏捏玩具。
Concluir desafio|Complete challenge|Completar desafío|完成挑战
Desafio rápido|Quick challenge|Desafío rápido|快速挑战
Crie um Squish em menos de 30 minutos.|Make a Squish in under 30 minutes.|Crea un Squish en menos de 30 minutos.|在 30 分钟内完成一个捏捏玩具。
Marcar como concluído|Mark as complete|Marcar como completado|标记为已完成
Materiais e Loja|Materials & Shop|Materiales y tienda|材料与商店
Use os pontos que ganhou no jogo para desbloquear materiais virtuais.|Use your game points to unlock virtual materials.|Usa tus puntos del juego para desbloquear materiales virtuales.|用游戏积分解锁虚拟材料。
Seu saldo|Your balance|Tu saldo|你的积分
Papel|Paper|Papel|纸张
Escolha os papéis da sua coleção.|Choose paper for your collection.|Elige papeles para tu colección.|挑选你想收集的纸张。
Ver itens →|View items →|Ver artículos →|查看物品 →
Enchimento|Filling|Relleno|填充物
Colecione enchimentos fofinhos.|Collect fluffy fillings.|Colecciona rellenos suaves.|收集软萌填充物。
Canetinhas|Markers|Rotuladores|彩笔
Desbloqueie conjuntos de cores.|Unlock color sets.|Desbloquea conjuntos de colores.|解锁彩笔套装。
Ganhar mais pontos|Earn more points|Ganar más puntos|赚取更多积分
Meus materiais|My materials|Mis materiales|我的材料
← Materiais e Loja|← Materials & Shop|← Materiales y tienda|← 材料与商店
Escolha os papéis da sua coleção. Cada compra desbloqueia um item virtual para o seu perfil.|Choose your paper. Each purchase unlocks a virtual item for your profile.|Elige tus papeles. Cada compra desbloquea un objeto virtual para tu perfil.|挑选纸张。每次兑换都会在个人资料中解锁一个虚拟物品。
Papel branco|White paper|Papel blanco|白纸
O básico para começar sua coleção.|The basics to start your collection.|Lo básico para empezar tu colección.|开始收藏的基础材料。
Papel colorido|Colored paper|Papel de colores|彩纸
Um toque de cor para seu mundo Squish.|A splash of color for your Squish world.|Un toque de color para tu mundo Squish.|为你的捏捏世界增添色彩。
Colecione enchimentos fofinhos. Cada compra desbloqueia um item virtual para o seu perfil.|Collect soft fillings. Each purchase unlocks a virtual item for your profile.|Colecciona rellenos suaves. Cada compra desbloquea un objeto virtual para tu perfil.|收集软萌填充物。每次兑换都会在个人资料中解锁一个虚拟物品。
Enchimento macio|Soft filling|Relleno suave|柔软填充物
Fofura para sua coleção de materiais.|Softness for your material collection.|Suavidad para tu colección de materiales.|为你的材料收藏增添柔软。
Enchimento nuvem|Cloud filling|Relleno nube|云朵填充物
Uma nuvem de maciez para seu mundo Squish.|A soft cloud for your Squish world.|Una nube suave para tu mundo Squish.|为你的捏捏世界增添柔软云朵。
Desbloqueie conjuntos de cores. Cada compra desbloqueia um item virtual para o seu perfil.|Unlock color sets. Each purchase unlocks a virtual item for your profile.|Desbloquea colores. Cada compra desbloquea un objeto virtual para tu perfil.|解锁彩笔套装。每次兑换都会在个人资料中解锁一个虚拟物品。
Canetinhas de 12 cores|12-color markers|Rotuladores de 12 colores|12 色彩笔
As primeiras cores da sua coleção.|The first colors in your collection.|Los primeros colores de tu colección.|你的第一套彩笔。
Canetinhas arco-íris|Rainbow markers|Rotuladores arcoíris|彩虹彩笔
Um conjunto especial para colecionar.|A special set to collect.|Un conjunto especial para coleccionar.|值得收藏的特别套装。
Ideias para o seu próximo Squish.|Ideas for your next Squish.|Ideas para tu próximo Squish.|为下一个捏捏玩具寻找灵感。
Comidas|Food|Comida|美食
Donuts, frutas, doces e mais.|Donuts, fruit, sweets and more.|Dónuts, frutas, dulces y más.|甜甜圈、水果、糖果等。
Animais|Animals|Animales|动物
Panda, gato, coelho e outros.|Panda, cat, rabbit and more.|Panda, gato, conejo y más.|熊猫、猫咪、兔子等。
Kawaii|Kawaii|Kawaii|萌萌造型
Nuvens, estrelas e arco-íris.|Clouds, stars and rainbows.|Nubes, estrellas y arcoíris.|云朵、星星和彩虹。
Surpresa|Surprise|Sorpresa|惊喜
Deixe o app escolher por você.|Let the app choose for you.|Deja que la app elija por ti.|让应用为你随机选择。
20 embalagens divertidas para imprimir em A4, recortar, dobrar e preencher.|20 fun packages to print on A4, cut, fold and fill.|20 envases divertidos para imprimir en A4, recortar, doblar y rellenar.|20 款趣味包装，用 A4 纸打印后剪裁、折叠并填充。
Como funciona:|How it works:|Cómo funciona:|使用方法：
toque em um modelo. Ele abre grande, em uma folha branca, com a arte colorida no próprio molde, linhas externas para recortar e linhas tracejadas para dobrar.|tap a template to open a full sheet. Cut along the outside edge and fold the dashed lines.|toca una plantilla para abrirla. Recorta el contorno exterior y dobla las líneas discontinuas.|点击模板打开整页。沿外轮廓剪裁，沿虚线折叠。
Molde aberto • imprimir, recortar e dobrar|Flat template • print, cut and fold|Plantilla plana • imprime, recorta y dobla|展开模板 • 打印、剪裁、折叠
← Moldes|← Templates|← Plantillas|← 模板
Molde aberto pronto para imprimir, recortar, dobrar e montar.|Flat template ready to print, cut, fold and assemble.|Plantilla lista para imprimir, recortar, doblar y montar.|展开模板，可打印、剪裁、折叠并组装。
Use papel A4, escala 100% e desative cabeçalhos e rodapés. Recorte o contorno, dobre os tracejados e una as bordas com fita. Encha antes de fechar a última face.|Use A4 paper at 100% scale, with headers and footers off. Cut the outline, fold the dashed lines and tape the edges. Fill before closing the last face.|Usa A4 a escala 100%, sin encabezados ni pies. Recorta el contorno, dobla las líneas discontinuas y une con cinta. Rellena antes de cerrar la última cara.|使用 A4 纸，缩放设为 100%，关闭页眉页脚。沿轮廓剪裁、沿虚线折叠，用胶带封边。封上最后一面前先填充。
Cortar|Cut|Cortar|剪裁
Linha contínua|Solid line|Línea continua|实线
Dobrar|Fold|Doblar|折叠
Linha tracejada|Dashed line|Línea discontinua|虚线
Imprimir este molde|Print this template|Imprimir esta plantilla|打印此模板
Escolher outro molde|Choose another template|Elegir otra plantilla|选择其他模板
Crie o seu próprio Squish|Design your own Squish|Diseña tu propio Squish|设计自己的捏捏玩具
Escolha cada parte, veja o resultado na hora e gere um molde exclusivo para imprimir.|Choose every part, see it live and generate your own printable template.|Elige cada parte, mira el resultado y genera tu plantilla.|选择各个部件，实时预览并生成专属打印模板。
Plus de R$ 5 • demonstração gratuita|R$5 Plus • free demo|Plus de R$5 • demo gratuita|R$5 Plus • 免费演示
R$ 5 é apenas o preço ilustrativo do Plus. Experimente o criador gratuitamente: esta versão não cobra nem solicita dados de pagamento.|R$5 is an illustrative Plus price only. Try the creator for free: this version does not charge or request payment details.|R$5 es solo un precio ilustrativo. Prueba el creador gratis: esta versión no cobra ni pide datos de pago.|R$5 仅为 Plus 的示例价格。免费试用创作工具：此版本不收款，也不索取支付信息。
Experimentar Plus grátis|Try Plus for free|Probar Plus gratis|免费试用 Plus
Demonstração sem cobrança. Nenhuma compra ou assinatura será criada.|Free demo. No purchase or subscription will be created.|Demo sin cobro. No se creará ninguna compra ni suscripción.|免费演示。不会创建任何购买或订阅。
Demonstração Plus gratuita • sem cobrança|Free Plus demo • no charges|Demo Plus gratuita • sin cobros|免费 Plus 演示 • 不收取费用
1. Formato|1. Shape|1. Forma|1. 形状
2. Cor|2. Color|2. Color|2. 颜色
3. Olhinhos|3. Eyes|3. Ojos|3. 眼睛
4. Boca|4. Mouth|4. Boca|4. 嘴巴
5. Detalhe|5. Decoration|5. Adorno|5. 装饰
Gerar meu molde para imprimir|Generate my printable template|Generar mi plantilla|生成打印模板
Me surpreenda|Surprise me|Sorpréndeme|随机惊喜
← Voltar ao criador|← Back to creator|← Volver al creador|← 返回创作工具
Seu Squish personalizado|Your custom Squish|Tu Squish personalizado|你的定制捏捏玩具
Imprima em A4 paisagem, escala 100%, sem cabeçalhos. O verso é espelhado: alinhe as partes com os desenhos para fora, prenda com fita e encha antes de fechar.|Print on landscape A4 at 100%, without headers. The back is mirrored: align both pieces with artwork facing out, tape and fill before sealing.|Imprime en A4 horizontal al 100%, sin encabezados. El reverso está reflejado: alinea las piezas con los dibujos hacia fuera, une con cinta y rellena antes de cerrar.|使用 A4 横向纸张，100% 缩放，不打印页眉。背面已镜像：图案朝外对齐两片，用胶带固定，填充后再封口。
Imprimir agora|Print now|Imprimir ahora|立即打印
Meu Mundo Squish|My Squish World|Mi mundo Squish|我的捏捏世界
Seu progresso fica aqui.|Your progress lives here.|Tu progreso está aquí.|在这里查看你的进度。
Seu nível considera todos os pontos ganhos, inclusive os usados na loja.|Your level counts all points earned, including those spent in the shop.|Tu nivel cuenta todos los puntos ganados, incluidos los usados en la tienda.|等级取决于累计积分，包括已在商店使用的积分。
Squishes concluídos|Completed Squishes|Squishes terminados|已完成的捏捏玩具
Continue criando|Keep creating|Sigue creando|继续创作
Visitar a loja|Visit the shop|Visitar la tienda|前往商店
Início|Home|Inicio|首页
Criar|Create|Crear|制作
Loja|Shop|Tienda|商店
Perfil|Profile|Perfil|我的
Iniciante|Beginner|Principiante|新手
Mestre do Squish|Squish master|Maestro Squish|捏捏大师
Criador|Creator|Creador|创作者
✓ Adquirido|✓ Collected|✓ Adquirido|✓ 已获得
Você ainda não tem materiais. Ganhe pontos nos desafios e escolha seus primeiros itens na loja.|No materials yet. Earn challenge points and choose your first items in the shop.|Aún no tienes materiales. Gana puntos en los desafíos y elige tus primeros objetos.|还没有材料。完成挑战赚取积分，到商店挑选第一件物品。
Não foi possível salvar a compra. Seus pontos foram mantidos. Tente novamente.|Could not save the purchase. Your points were kept. Try again.|No se pudo guardar la compra. Tus puntos se conservaron. Inténtalo de nuevo.|无法保存兑换，积分已保留，请重试。
{name} adquirido! Está em Meus materiais no seu perfil.|{name} collected! Find it in My materials on your profile.|¡{name} adquirido! Está en Mis materiales de tu perfil.|已获得{name}！可在个人资料的“我的材料”中查看。
{n} pontos|{n} points|{n} puntos|{n} 积分
Faltam {n} pontos|Need {n} more points|Faltan {n} puntos|还需 {n} 积分
Comprar por {n} pontos|Get for {n} points|Canjear por {n} puntos|用 {n} 积分兑换
{n} feitos|{n} made|{n} hechos|已制作 {n} 个
1 feitos|1 made|1 hecho|已制作 1 个
{n} conquistas|{n} achievements|{n} logros|{n} 项成就
1 conquistas|1 achievement|1 logro|1 项成就
{level} • {n} pontos ganhos|{level} • {n} points earned|{level} • {n} puntos ganados|{level} • 累计 {n} 积分
{level} • {n} min|{level} • {n} min|{level} • {n} min|{level} • {n} 分钟
Desafio concluído! +{n} pontos|Challenge complete! +{n} points|¡Desafío completado! +{n} puntos|挑战完成！+{n} 积分
Você conseguiu! +25 pontos|You did it! +25 points|¡Lo lograste! +25 puntos|完成了！+25 积分
Demonstração Plus liberada. Nenhuma cobrança foi feita.|Plus demo unlocked. You have not been charged.|Demo Plus activada. No se ha cobrado nada.|Plus 演示已解锁，未收取费用。
Não foi possível salvar neste navegador. Seu progresso ficará apenas nesta sessão.|This browser could not save your progress. It will last only for this session.|No se pudo guardar el progreso. Solo se conservará durante esta sesión.|此浏览器无法保存进度，仅在本次使用期间保留。
Coração|Heart|Corazón|爱心
Nuvem|Cloud|Nube|云朵
Redondo|Round|Redondo|圆形
Estrela|Star|Estrella|星星
amarelo|yellow|amarillo|黄色
rosa|pink|rosa|粉色
roxo|purple|morado|紫色
verde|green|verde|绿色
azul|blue|azul|蓝色
laranja|orange|naranja|橙色
Sem detalhe|No decoration|Sin adorno|无装饰
Laço|Bow|Lazo|蝴蝶结
Flor|Flower|Flor|花朵
Brilhos|Sparkles|Destellos|闪光
Morango|Strawberry|Fresa|草莓
linha contínua = recortar • linha tracejada = dobrar|solid line = cut • dashed line = fold|línea continua = cortar • discontinua = doblar|实线剪裁 • 虚线折叠
1. Imprima em 100% / tamanho real|1. Print at 100% / actual size|1. Imprime al 100% / tamaño real|1. 按 100% / 实际大小打印
2. Recorte somente o contorno externo|2. Cut only the outside outline|2. Recorta solo el contorno exterior|2. 只沿外轮廓剪裁
3. Dobre nas linhas tracejadas e monte|3. Fold dashed lines and tape together|3. Dobla las líneas discontinuas y une con cinta|3. 沿虚线折叠，用胶带组装
MEU SQUISH PLUS • FRENTE E VERSO|MY SQUISH PLUS • FRONT & BACK|MI SQUISH PLUS • ANVERSO Y REVERSO|我的 PLUS 捏捏玩具 • 正反面
Recorte as duas peças, una as bordas e deixe uma abertura para colocar enchimento|Cut both pieces, tape the edges and leave an opening for filling|Recorta las piezas, une los bordes y deja una abertura para rellenar|剪下两片，封住边缘，留出填充开口
Exclusivo Squish Funny Plus • criado por você|Squish Funny Plus demo • made by you|Demo Squish Funny Plus • creado por ti|Squish Funny Plus 演示 • 由你创作
Pronto para usar sem internet.|Ready to use offline.|Listo para usar sin internet.|已可离线使用。
Sem internet. Usando a versão salva.|Offline. Using the saved version.|Sin internet. Usando la versión guardada.|当前离线，正在使用已保存版本。
Não foi possível preparar o modo offline. Tente novamente com internet.|Could not prepare offline mode. Try again while online.|No se pudo preparar el modo sin conexión. Reinténtalo con internet.|无法准备离线模式，请联网后重试。
No iPhone/iPad: abra no Safari → Compartilhar → Adicionar à Tela de Início.|On iPhone/iPad: open in Safari → Share → Add to Home Screen.|En iPhone/iPad: abre en Safari → Compartir → Añadir a pantalla de inicio.|iPhone/iPad：用 Safari 打开 → 分享 → 添加到主屏幕。
No Android: abra o menu do navegador → Instalar app ou Adicionar à tela inicial. No computador, procure o ícone de instalação na barra de endereço.|On Android: browser menu → Install app or Add to Home Screen. On desktop, look for the install icon in the address bar.|En Android: menú del navegador → Instalar app o Añadir a pantalla de inicio. En ordenador, busca el icono de instalación en la barra de direcciones.|Android：浏览器菜单 → 安装应用或添加到主屏幕。电脑上可在地址栏查找安装图标。
Baixar molde SVG|Download SVG template|Descargar plantilla SVG|下载 SVG 模板
Panda|Panda|Panda|熊猫
Recomeçar tutorial|Start tutorial again|Repetir tutorial|重新开始教程
Hoje já concluído|Completed today|Completado hoy|今日已完成
Projeto concluído|Project completed|Proyecto completado|作品已完成
`.trim().split('\n').map(line=>{const [pt,en,es,zh]=line.split('|');return [pt,{pt,en,es,zh}];}));

const templates=Object.keys(COPY).filter(key=>key.includes('{')).sort((a,b)=>b.length-a.length).map(key=>{
  const names=[];
  const pattern=key.split(/(\{\w+\})/).map(part=>{
    if(/^\{\w+\}$/.test(part)){names.push(part.slice(1,-1));return '(.+?)';}
    return part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  }).join('');
  return {key,names,regex:new RegExp('^'+pattern+'$')};
});
function t(source,values={}) {
  let result=COPY[source]?.[language]||source;
  for(const [key,value] of Object.entries(values)) result=result.replaceAll('{'+key+'}',String(value));
  return result;
}
function translateCopy(source){
  if(COPY[source]) return t(source);
  for(const rule of templates){
    const match=source.match(rule.regex);
    if(match) return t(rule.key,Object.fromEntries(rule.names.map((name,i)=>[name,translateCopy(match[i+1])])));
  }
  return source;
}
// Keep the original text for reliable round trips; never replace markup or user data.
const sourceNodes=new WeakMap(),sourceAttributes=new WeakMap();
function localizePage(){
  const walker=document.createTreeWalker(document.querySelector('.app'),NodeFilter.SHOW_TEXT);
  let node;
  while(node=walker.nextNode()){
    if(node.parentElement.closest('script,style,select,.lang,[data-no-translate]')) continue;
    const current=node.nodeValue,previous=sourceNodes.get(node);
    const source=previous&&current===previous.output?previous.source:current;
    const output=source.replace(/\S[\s\S]*\S|\S/,value=>translateCopy(value));
    sourceNodes.set(node,{source,output});
    if(current!==output) node.nodeValue=output;
  }
  document.querySelectorAll('[title],[aria-label]').forEach(el=>{
    const record=sourceAttributes.get(el)||{};
    for(const attr of ['title','aria-label']){
      if(!el.hasAttribute(attr)) continue;
      const current=el.getAttribute(attr),previous=record[attr];
      const source=previous&&current===previous.output?previous.source:current;
      const output=translateCopy(source);record[attr]={source,output};
      if(current!==output) el.setAttribute(attr,output);
    }
    sourceAttributes.set(el,record);
  });
}
let toastTimer;
function notify(message){
  const el=document.getElementById('toast'); el.textContent=message; el.hidden=false;
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.hidden=true,6500);
  localizePage();
}
