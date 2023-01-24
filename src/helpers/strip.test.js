const strip = require("./strip.js")

test("tests `strip`", () => {
  expect(strip("foobarbaz")).toBe("foobarbaz")

  expect(strip("Hello, world! My name is Josh!")).toBe(
    "hello world my name is josh"
  )

  expect(strip("'42 is the number thou shalt count!'")).toBe(
    "42 is the number thou shalt count"
  )

  expect(strip("I don't like you.")).toBe("i don t like you")

  expect(
    strip(
      "吾鄉先輩詩人徐菊潭有《豆棚吟》一冊，其所詠古風、律絕諸篇，俱宇宙古今奇情快事，久矣膾炙人口，惜乎人遐世遠、湮沒無傳，至今高人韻士每到秋風豆熟之際，誦其一二聯句，令人神往。"
    )
  ).toBe(
    "吾鄉先輩詩人徐菊潭有 豆棚吟 一冊 其所詠古風 律絕諸篇 俱宇宙古今奇情快事 久矣膾炙人口 惜乎人遐世遠 湮沒無傳 至今高人韻士每到秋風豆熟之際 誦其一二聯句 令人神往"
  )

  expect(
    strip(
      "खेल मंत्रालय ने बाद में बयान जारी कर कहा कि मंत्रालय ने प्रमुख खिलाड़ियों की ओर से लगाए गए यौन दुराचार, उत्पीड़न, वित्तिय अनियमितताओं और प्रशासनिक चूक के आरोपों की जांच के लिए निरीक्षण समिति का गठन किया है। निरीक्षण समिति जांच के दौरान डब्ल्यूएफआई के दिन-प्रतिदिन के प्रशासन को भी संभालेगी। ओवरसाइट कमेटी की अध्यक्षता खेल रत्न अवार्डी एमसी मैरी कॉम करेंगी। कमेटी में खेल रत्न अवार्डी योगेश्वर दत्त, भारतीय ओलंपिक संघ (आईओए) की कार्यकारी परिषद के ध्यानचंद अवार्डी तृप्ति मुर्गुंडे, सदस्य मिशन ओलंपिक सेल राधिका श्रीमन शामिल हैं। निगरानी समिति 4 सप्ताह के भीतर जांच पूरी करेगी।"
    )
  ).toBe(
    "खेल मंत्रालय ने बाद में बयान जारी कर कहा कि मंत्रालय ने प्रमुख खिलाड़ियों की ओर से लगाए गए यौन दुराचार उत्पीड़न वित्तिय अनियमितताओं और प्रशासनिक चूक के आरोपों की जांच के लिए निरीक्षण समिति का गठन किया है निरीक्षण समिति जांच के दौरान डब्ल्यूएफआई के दिन प्रतिदिन के प्रशासन को भी संभालेगी ओवरसाइट कमेटी की अध्यक्षता खेल रत्न अवार्डी एमसी मैरी कॉम करेंगी कमेटी में खेल रत्न अवार्डी योगेश्वर दत्त भारतीय ओलंपिक संघ आईओए की कार्यकारी परिषद के ध्यानचंद अवार्डी तृप्ति मुर्गुंडे सदस्य मिशन ओलंपिक सेल राधिका श्रीमन शामिल हैं निगरानी समिति 4 सप्ताह के भीतर जांच पूरी करेगी"
  )

  expect(
    strip(
      "Cuando era niña, Evangelina Jaime disfrutaba pasar las tardes con su abuela paterna en el jardín, viéndola cuidar sus plantas. Era todavía muy pequeña para comprender que su abuela guardaba un secreto ancestral y que ella y su padre serían los encargados de sacarlo a la luz casi treinta años después."
    )
  ).toBe(
    "cuando era niña evangelina jaime disfrutaba pasar las tardes con su abuela paterna en el jardín viéndola cuidar sus plantas era todavía muy pequeña para comprender que su abuela guardaba un secreto ancestral y que ella y su padre serían los encargados de sacarlo a la luz casi treinta años después"
  )

  expect(
    strip(
      `"Les décisions de Zelensky témoignent des priorités clés de l'État (...) Le président voit et entend la société. Et il répond directement à une demande prioritaire de l'opinion publique : la justice pour tous", a déclaré Mikhaïlo Podoliak, conseiller du chef de l'État.`
    )
  ).toBe(
    "les décisions de zelensky témoignent des priorités clés de l état le président voit et entend la société et il répond directement à une demande prioritaire de l opinion publique la justice pour tous a déclaré mikhaïlo podoliak conseiller du chef de l état"
  )

  expect(
    strip(
      `وقال فوميو كيشيدا إن هذه حالة "إما أن تعالج الآن وإما فقدنا الأمل". وتشير التقديرات إلى أن اليابان - التي يبلغ عدد سكانها 125 مليون نسمة - شهدت أقل من 800000 ولادة العام الماضي. أما في السبعينيات فكان هذا الرقم أكثر من مليوني شخص. وتتباطأ معدلات المواليد في العديد من البلدان، بما في ذلك جيران اليابان. لكن المشكلة تبدو أكثر حدة في اليابان بشكل خاص؛ حيث ارتفع متوسط العمر المتوقع في العقود الأخيرة، مما يعني أن هناك عددا متزايدا من كبار السن، وأعدادا متناقصة من العمال لدعمهم. `
    )
  ).toBe(
    "وقال فوميو كيشيدا إن هذه حالة إما أن تعالج الآن وإما فقدنا الأمل وتشير التقديرات إلى أن اليابان التي يبلغ عدد سكانها 125 مليون نسمة شهدت أقل من 800000 ولادة العام الماضي أما في السبعينيات فكان هذا الرقم أكثر من مليوني شخص وتتباطأ معدلات المواليد في العديد من البلدان بما في ذلك جيران اليابان لكن المشكلة تبدو أكثر حدة في اليابان بشكل خاص حيث ارتفع متوسط العمر المتوقع في العقود الأخيرة مما يعني أن هناك عددا متزايدا من كبار السن وأعدادا متناقصة من العمال لدعمهم"
  )

  expect(
    strip(
      `সময়ের সঙ্গে সমাজ এগোচ্ছে। কিন্তু মানুষের মানসিকতার বদল হয়তো ঘটছে না। এখনও সমাজের আনাচেকানাচে গোপনে বেঁচে রয়েছে পণপ্রথা! এবারে পণ নেওয়ার বিরুদ্ধে সোচ্চার হলেন অভিনেত্রী দেবলীনা কুমার। সোমবার সমাজমাধ্যমে একটি পোস্ট করেন দেবলীনা। তাঁর পোস্ট থেকেই জানা যায় সচ্ছল পরিবারে এখনও পণ নেওয়ার চল রয়েছে। তবে অভিনেত্রী বরপক্ষের পরিবারের নাম আড়ালেই রেখেছেন। দেবলীনা ফেসবুকে লিখেছেন, ‘‘আজকে শুনলাম আমার এক জন চেনা ছেলে নাকি বিয়ের জন্য পণ চেয়েছে। আজ্ঞে হ্যাঁ,... এই খোদ কলকাতাতে।’’ এরই সঙ্গে অভিনেত্রী লিখেছেন, ‘‘লজ্জাতে মাথা কাটা যাচ্ছে তোমাদের চিনি বলে।’’`
    )
  ).toBe(
    "সময়ের সঙ্গে সমাজ এগোচ্ছে কিন্তু মানুষের মানসিকতার বদল হয়তো ঘটছে না এখনও সমাজের আনাচেকানাচে গোপনে বেঁচে রয়েছে পণপ্রথা এবারে পণ নেওয়ার বিরুদ্ধে সোচ্চার হলেন অভিনেত্রী দেবলীনা কুমার সোমবার সমাজমাধ্যমে একটি পোস্ট করেন দেবলীনা তাঁর পোস্ট থেকেই জানা যায় সচ্ছল পরিবারে এখনও পণ নেওয়ার চল রয়েছে তবে অভিনেত্রী বরপক্ষের পরিবারের নাম আড়ালেই রেখেছেন দেবলীনা ফেসবুকে লিখেছেন আজকে শুনলাম আমার এক জন চেনা ছেলে নাকি বিয়ের জন্য পণ চেয়েছে আজ্ঞে হ্যাঁ এই খোদ কলকাতাতে এরই সঙ্গে অভিনেত্রী লিখেছেন লজ্জাতে মাথা কাটা যাচ্ছে তোমাদের চিনি বলে"
  )

  expect(
    strip(
      `Министерство юстиции России внесло в реестр «иностранных агентов» основателя правозащитного проекта Gulagu.net Владимира Осечкина и певицу Елизавету Гырдымову, известную как «Монеточка». Помимо этого, туда включили депутата Мосгордумы от «Яблока» Дарью Беседину, блогеров Вадима Харченко и Антона Устимова, а также одного из лидеров черкесского движения Ибрагима Яганова. Кроме того, в реестр попал проект для трансгендерных людей и их близких «T9 NSK».`
    )
  ).toBe(
    "министерство юстиции россии внесло в реестр иностранных агентов основателя правозащитного проекта gulagu net владимира осечкина и певицу елизавету гырдымову известную как монеточка помимо этого туда включили депутата мосгордумы от яблока дарью беседину блогеров вадима харченко и антона устимова а также одного из лидеров черкесского движения ибрагима яганова кроме того в реестр попал проект для трансгендерных людей и их близких t9 nsk"
  )

  expect(
    strip(
      `Duas apresentações, seis pontos somados e vaga antecipada ao hexagonal final do Campeonato Sul-Americano sub-20 da Colômbia. Tudo anda às mil maravilhas para a seleção brasileira, que festejou em dose dupla nesta segunda-feira, no Estádio Pascual Guerrero, em Cali. Além de garantir a classificação, com 3 a 1 diante da Argentina, ainda deixou a rival em situação delicada na competição, zerada e sem depender de suas forças.`
    )
  ).toBe(
    "duas apresentações seis pontos somados e vaga antecipada ao hexagonal final do campeonato sul americano sub 20 da colômbia tudo anda às mil maravilhas para a seleção brasileira que festejou em dose dupla nesta segunda feira no estádio pascual guerrero em cali além de garantir a classificação com 3 a 1 diante da argentina ainda deixou a rival em situação delicada na competição zerada e sem depender de suas forças"
  )

  expect(
    strip(
      `دنیا میں کورونا وائرس کی وبا کے تدارک کے لیے جب مختلف ملکوں نے لاک ڈاون لگائے تو پاکستان میں مکمل لاک ڈاون کی بجائے سمارٹ لاک ڈاون کی پالیسی اپنائی گئی اور برآمدی شعبے کو کام کرنے کی اجازت حاصل رہی۔ اس دوران خطے کے دوسرے ممالک جن میں خاص کر انڈیا اور بنگلہ دیش شامل ہیں، وہاں لاک ڈاون لگنے کی وجہ سے صنعتی کام بند ہوا تو امریکہ اور یورپ میں ہوم ٹیکسٹائل اور گارمنٹس کے برآمدی آرڈرز نے پاکستان کا رخ کیا جس نے پاکستان کے گارمنٹس کے شعبے کو بہت فائدہ پہنچایا۔`
    )
  ).toBe(
    "دنیا میں کورونا وائرس کی وبا کے تدارک کے لیے جب مختلف ملکوں نے لاک ڈاون لگائے تو پاکستان میں مکمل لاک ڈاون کی بجائے سمارٹ لاک ڈاون کی پالیسی اپنائی گئی اور برآمدی شعبے کو کام کرنے کی اجازت حاصل رہی اس دوران خطے کے دوسرے ممالک جن میں خاص کر انڈیا اور بنگلہ دیش شامل ہیں وہاں لاک ڈاون لگنے کی وجہ سے صنعتی کام بند ہوا تو امریکہ اور یورپ میں ہوم ٹیکسٹائل اور گارمنٹس کے برآمدی آرڈرز نے پاکستان کا رخ کیا جس نے پاکستان کے گارمنٹس کے شعبے کو بہت فائدہ پہنچایا"
  )

  expect(
    strip(
      `Jakarta (ANTARA) - Pakar gizi klinik dr Juwalita Surapsari, Sp.GK mengingatkan orang-orang bahwa asupan serat tak hanya bisa didapatkan dari konsumsi buah dan sayur tetapi juga sumber lain semisal karbohidrat. "Selain sayur dan buah yang memang wajib, tetapi kita bisa juga bisa menambahkannya dari pilihan karbohidrat yang benar," ujar dia dalam acara "Offline Media Gathering: Tokopedia dan Ahli Gizi Bicara Tren Makanan Kekinian nan Sehat" di Jakarta, Selasa.`
    )
  ).toBe(
    "jakarta antara pakar gizi klinik dr juwalita surapsari sp gk mengingatkan orang orang bahwa asupan serat tak hanya bisa didapatkan dari konsumsi buah dan sayur tetapi juga sumber lain semisal karbohidrat selain sayur dan buah yang memang wajib tetapi kita bisa juga bisa menambahkannya dari pilihan karbohidrat yang benar ujar dia dalam acara offline media gathering tokopedia dan ahli gizi bicara tren makanan kekinian nan sehat di jakarta selasa"
  )

  expect(
    strip(
      `Wenn man sich vor 2500 Jahren dem Aphaiatempel auf der griechischen Insel Ägina näherte, stieß man zunächst auf die Skulptur eines jungen Bogenschützen. Er war in leuchtenden Farben bemalt - in der Antike ein gängiges Mittel, um Figuren möglichst lebensecht aussehen zu lassen. "Lasst eure Augen zum Himmel aufsteigen und seht euch die gemalten Reliefs des Giebels an", schrieb der griechische Dramatiker Euripides um 408 v. Chr. in seinem Theaterstück "Hypsipyle" über den Tempel.`
    )
  ).toBe(
    "wenn man sich vor 2500 jahren dem aphaiatempel auf der griechischen insel ägina näherte stieß man zunächst auf die skulptur eines jungen bogenschützen er war in leuchtenden farben bemalt in der antike ein gängiges mittel um figuren möglichst lebensecht aussehen zu lassen lasst eure augen zum himmel aufsteigen und seht euch die gemalten reliefs des giebels an schrieb der griechische dramatiker euripides um 408 v chr in seinem theaterstück hypsipyle über den tempel"
  )

  expect(
    strip(
      `安倍晋三元首相の銃撃事件を機に浮かび上がった政治と宗教の深い結びつき。「敵基地攻撃能力」の付与で大きく転換する戦後日本の安保政策……。自民党が政権に復帰して10年余、この国の政治の姿について、憲法学者の蟻川恒正さんが寄稿しました。 「ただ死と云（い）う事だけが真（まこと）だよ」 「いやだぜ」 「死に突き当らなくっちゃ、人間の浮気はなかなかやまないものだ」 「やまなくって好（い）いから、突き当るのは真っ平御免だ」 「御免だって今に来る。来た時にああそうかと思い当るんだね」`
    )
  ).toBe(
    "安倍晋三元首相の銃撃事件を機に浮かび上がった政治と宗教の深い結びつき 敵基地攻撃能力 の付与で大きく転換する戦後日本の安保政策 自民党が政権に復帰して10年余 この国の政治の姿について 憲法学者の蟻川恒正さんが寄稿しました ただ死と云 い う事だけが真 まこと だよ いやだぜ 死に突き当らなくっちゃ 人間の浮気はなかなかやまないものだ やまなくって好 い いから 突き当るのは真っ平御免だ 御免だって今に来る 来た時にああそうかと思い当るんだね"
  )
})
