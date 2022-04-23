import Mock from "mockjs";

let files = require.context("/public/markdownFile", false, /\.md$/);
// let blogs = files.keys();
let blogs = files.keys().map((item) => {
  var title = item.slice(item.indexOf("/") + 1, item.lastIndexOf("-"));
  var time = item.slice(item.lastIndexOf('-') + 1, item.indexOf('.md'))
  return {
    title: title,
    path: item,
    timeNum: time
  };
});
var id = 0;
// var time = new Date().toString();
// time = time.slice(3, 10) + ', ' + time.slice(11, 15)
var months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

blogs = blogs.map((item) => {
  return {
    id: ++id,
    title: item.title,
    path: item.path,
    timeNum: item.timeNum,
    time: months[parseInt(item.timeNum.slice(4, 6)) - 1] + ' ' + item.timeNum.slice(6) + ' , ' + item.timeNum.slice(0, 4)
  }
})
// 排序规则
function sortBy(key) {
  return (x, y) => {
    return y[key] - x[key];
  };
}
blogs = blogs.sort(sortBy('timeNum'))
// console.log(blogs);
Mock.mock('getBlogs', {
  blogs: blogs
})

Mock.mock('getPhotos', {
  photos: [
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838690/photosp/3d9d7a66-a1f1-4969-ad91-c05955920d2d/3d9d7a66-a1f1-4969-ad91-c05955920d2d.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/a8d34d60-a077-4c8f-8447-60b820b0759e/a8d34d60-a077-4c8f-8447-60b820b0759e.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/be3df170-71fc-44df-9e78-e4517cd265a5/be3df170-71fc-44df-9e78-e4517cd265a5.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1630165670/photosp/7ae77438-0b9a-4b67-96b6-5b30dc926d95/7ae77438-0b9a-4b67-96b6-5b30dc926d95.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1637242091/photosp/01d589fd-82dd-401c-ab2a-01b35c89d0d5/01d589fd-82dd-401c-ab2a-01b35c89d0d5.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838683/photosp/7036b695-96b2-4566-bf52-eaa82f84394d/7036b695-96b2-4566-bf52-eaa82f84394d.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1628971249/photosp/49eee515-7b62-4adb-8593-f9d6166869a4/49eee515-7b62-4adb-8593-f9d6166869a4.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838680/photosp/f5195da3-5df8-4039-ab82-ce4bfd9b8947/f5195da3-5df8-4039-ab82-ce4bfd9b8947.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1628971249/photosp/49eee515-7b62-4adb-8593-f9d6166869a4/49eee515-7b62-4adb-8593-f9d6166869a4.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838681/photosp/9ca07793-fddf-4a66-aad7-275d45e343bc/9ca07793-fddf-4a66-aad7-275d45e343bc.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1627279973/photosp/f73263fe-bc01-44b0-9326-4b0ea6e820a7/f73263fe-bc01-44b0-9326-4b0ea6e820a7.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838668/photosp/2842569e-29e4-4c25-a70f-7402f941cca2/2842569e-29e4-4c25-a70f-7402f941cca2.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1620594704/photosp/bd35932f-98e9-4164-bb40-24f2df77ce93/bd35932f-98e9-4164-bb40-24f2df77ce93.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838668/photosp/ac1ec457-3756-4e2c-ad56-83fcba9dac95/ac1ec457-3756-4e2c-ad56-83fcba9dac95.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838668/photosp/48c04d14-eb74-432d-8a62-ebcfcb1899f9/48c04d14-eb74-432d-8a62-ebcfcb1899f9.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1601745599/photosp/d3dfec07-f765-4487-9b66-7962e3a2652d/d3dfec07-f765-4487-9b66-7962e3a2652d.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1613131213/photosp/d1a4e73d-4e34-4706-bcc9-08d5504bd86e/d1a4e73d-4e34-4706-bcc9-08d5504bd86e.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756288/photosp/148e8305-f862-45ee-9f44-a117c3492d99/148e8305-f862-45ee-9f44-a117c3492d99.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838667/photosp/799e43b4-dca5-4569-83d1-af2b46158c98/799e43b4-dca5-4569-83d1-af2b46158c98.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838667/photosp/eba7e93d-6dd8-42eb-a957-7be0581406aa/eba7e93d-6dd8-42eb-a957-7be0581406aa.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838663/photosp/ffa15c9c-4c06-4113-9d0c-8ed84f68bdfe/ffa15c9c-4c06-4113-9d0c-8ed84f68bdfe.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838664/photosp/fff6e5a3-27f0-4b49-81a8-d9c36985e550/fff6e5a3-27f0-4b49-81a8-d9c36985e550.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838662/photosp/d415856a-9fad-4b37-bab4-1eae8addb60e/d415856a-9fad-4b37-bab4-1eae8addb60e.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838657/photosp/6b20008b-17dd-4121-a899-bc00965b14c3/6b20008b-17dd-4121-a899-bc00965b14c3.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838656/photosp/fba6278a-03f7-4bd1-8f0b-f60b21e5af8b/fba6278a-03f7-4bd1-8f0b-f60b21e5af8b.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838654/photosp/f0a93be6-4969-4eac-b64e-0430ac16029c/f0a93be6-4969-4eac-b64e-0430ac16029c.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838653/photosp/5927e280-8496-4f79-8935-dd2bcc813342/5927e280-8496-4f79-8935-dd2bcc813342.jpg",
    },
    {
      path: "https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1614187177/photosp/91df0087-93f7-4f51-8ee1-39b9012628d2/91df0087-93f7-4f51-8ee1-39b9012628d2.jpg",
    },
  ],
})

Mock.mock('getVlogs', {
  vlogs: [

    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-down-a-mountain-41576-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838690/photosp/3d9d7a66-a1f1-4969-ad91-c05955920d2d/3d9d7a66-a1f1-4969-ad91-c05955920d2d.jpg',
      title: '测试用title按揭房好受点卡拉和打啥时候爱仕达埃及回复卡视角哈利手机号看付好款沙口路哈克斯发师傅好 刊发空间书法家啥课哈里哈'
    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/a8d34d60-a077-4c8f-8447-60b820b0759e/a8d34d60-a077-4c8f-8447-60b820b0759e.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838685/photosp/be3df170-71fc-44df-9e78-e4517cd265a5/be3df170-71fc-44df-9e78-e4517cd265a5.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-very-close-shot-of-the-leaves-of-a-tree-wet-18310-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1630165670/photosp/7ae77438-0b9a-4b67-96b6-5b30dc926d95/7ae77438-0b9a-4b67-96b6-5b30dc926d95.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-people-pouring-a-warm-drink-around-a-campfire-513-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1637242091/photosp/01d589fd-82dd-401c-ab2a-01b35c89d0d5/01d589fd-82dd-401c-ab2a-01b35c89d0d5.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838653/photosp/5927e280-8496-4f79-8935-dd2bcc813342/5927e280-8496-4f79-8935-dd2bcc813342.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-panorama-of-a-landscape-with-mountains-and-a-lake-42491-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1603756288/photosp/148e8305-f862-45ee-9f44-a117c3492d99/148e8305-f862-45ee-9f44-a117c3492d99.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838654/photosp/f0a93be6-4969-4eac-b64e-0430ac16029c/f0a93be6-4969-4eac-b64e-0430ac16029c.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838656/photosp/fba6278a-03f7-4bd1-8f0b-f60b21e5af8b/fba6278a-03f7-4bd1-8f0b-f60b21e5af8b.jpg',
      title: '测试用title'

    },
    {
      path: 'https://assets.mixkit.co/videos/preview/mixkit-landscape-of-mountains-and-sunset-3128-large.mp4',
      poster: 'https://res.cloudinary.com/twenty20/private_images/t_standard-fit/v1521838662/photosp/d415856a-9fad-4b37-bab4-1eae8addb60e/d415856a-9fad-4b37-bab4-1eae8addb60e.jpg',
      title: '测试用title'

    },
  ]
})

Mock.mock('getProjects', {
  projects: [
    {
      name: 'MineSweepe', path: '/minesweepe', icon: 'icon-saolei', info: 'Minesweeper is really an exciting game, and I wish I could help improving it a little bit!'
    },
    { name: 'GreedySnake', path: '/greedysnake', icon: 'icon-tanchishe', info: 'Is a small game procedures, Snake game, provides a complete procedere to run.' },
    { name: 'Parallax Scrolling', path: '/parallaxscrolling', icon: 'icon-shichagundong', info: 'Parallax scrolling refers to making the multi-layer background move at different speeds to form a three-dimensional motion effect and bring a very excellent visual experience.' },
    { name: 'NetEase CloudMusic', path: '/neteasecloudmusic', icon: 'icon-wangyiyunyinle1-copy', info: 'Netease cloudmusic is a music product developed by Netease and the achievement of Netease Hangzhou Research Institute' }
  ]
})