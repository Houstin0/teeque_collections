// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from '../../../components/ui/Button';
// import Image from '../../../components/AppImage';
// import Icon from '../../../components/AppIcon';

// const CulturalMoments = () => {
//   const [activeFilter, setActiveFilter] = useState('all');

//   const culturalMoments = [
//     {
//       id: 1,
//       type: 'instagram',
//       username: '@streetstyle_maya',
//       userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
//       image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "Teeque's Urban Canvas Jacket hits different in the city lights ✨ #TeequeStyle #StreetFashion",
//       likes: 2847,
//       comments: 156,
//       product: "Urban Canvas Jacket",
//       location: "Brooklyn, NY",
//       timestamp: "2 hours ago"
//     },
//     {
//       id: 2,
//       type: 'tiktok',
//       username: '@fashion_forward_jay',
//       userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
//       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "3 ways to style the Midnight Rebellion Hoodie 🔥 Which look is your fave?",
//       likes: 15420,
//       comments: 892,
//       product: "Midnight Rebellion Hoodie",
//       location: "Los Angeles, CA",
//       timestamp: "5 hours ago"
//     },
//     {
//       id: 3,
//       type: 'instagram',
//       username: '@urban_explorer_sam',
//       userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
//       image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "Rooftop vibes with my favorite Teeque pieces. Style that speaks volumes 📸",
//       likes: 4521,
//       comments: 234,
//       product: "Street Poetry Tee",
//       location: "Chicago, IL",
//       timestamp: "1 day ago"
//     },
//     {
//       id: 4,
//       type: 'tiktok',
//       username: '@style_curator_alex',
//       userAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
//       image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "Teeque cargo pants styling tutorial - from casual to elevated street 💯",
//       likes: 8934,
//       comments: 445,
//       product: "Rooftop Chronicles Cargo",
//       location: "Miami, FL",
//       timestamp: "2 days ago"
//     },
//     {
//       id: 5,
//       type: 'instagram',
//       username: '@minimalist_mia',
//       userAvatar: "https://randomuser.me/api/portraits/women/41.jpg",
//       image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "Less is more with Teeque\'s clean lines and perfect fits 🖤 #MinimalStreet",
//       likes: 3267,
//       comments: 178,
//       product: "Essential Basics Collection",
//       location: "Seattle, WA",
//       timestamp: "3 days ago"
//     },
//     {
//       id: 6,
//       type: 'tiktok',
//       username: '@color_pop_chris',
//       userAvatar: "https://randomuser.me/api/portraits/men/29.jpg",
//       image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//       caption: "Adding color to the concrete jungle with Teeque\'s bold pieces 🌈",
//       likes: 12567,
//       comments: 623,
//       product: "Neon Dreams Collection",
//       location: "New York, NY",
//       timestamp: "4 days ago"
//     }
//   ];

//   const filters = [
//     { id: 'all', label: 'All Posts', icon: 'Grid3X3' },
//     { id: 'instagram', label: 'Instagram', icon: 'Instagram' },
//     { id: 'tiktok', label: 'TikTok', icon: 'Video' }
//   ];

//   const filteredMoments = activeFilter === 'all' 
//     ? culturalMoments 
//     : culturalMoments.filter(moment => moment.type === activeFilter);

//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toString();
//   };

//   return (
//     <section className="py-16 lg:py-24 bg-muted">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center space-x-2 bg-background px-4 py-2 rounded-full mb-4">
//             <Icon name="Camera" size={16} className="text-conversion" />
//             <span className="text-sm font-medium text-text-secondary">Community Spotlight</span>
//           </div>
//           <h2 className="font-brand-headline text-4xl lg:text-5xl font-bold text-foreground mb-4">
//             Cultural Moments
//           </h2>
//           <p className="text-lg text-text-secondary max-w-2xl mx-auto">
//             Real people, real style. See how our community brings Teeque to life in their everyday moments.
//           </p>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex justify-center mb-12">
//           <div className="inline-flex bg-background rounded-xl p-1 brand-shadow">
//             {filters.map((filter) => (
//               <button
//                 key={filter.id}
//                 onClick={() => setActiveFilter(filter.id)}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//                   activeFilter === filter.id
//                     ? 'bg-conversion text-conversion-foreground brand-shadow-button'
//                     : 'text-text-secondary hover:text-foreground hover:bg-muted'
//                 }`}
//               >
//                 <Icon name={filter.icon} size={18} />
//                 <span>{filter.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Moments Grid */}
//         <div className="masonry-grid">
//           {filteredMoments.map((moment) => (
//             <div
//               key={moment.id}
//               className="bg-background rounded-2xl overflow-hidden brand-shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-6 break-inside-avoid"
//             >
//               {/* User Header */}
//               <div className="p-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Image
//                     src={moment.userAvatar}
//                     alt={moment.username}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold text-foreground">{moment.username}</p>
//                     <p className="text-xs text-text-secondary">{moment.location} • {moment.timestamp}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Icon 
//                     name={moment.type === 'instagram' ? 'Instagram' : 'Video'} 
//                     size={16} 
//                     className={moment.type === 'instagram' ? 'text-pink-500' : 'text-black'}
//                   />
//                 </div>
//               </div>

//               {/* Content Image */}
//               <div className="relative">
//                 <Image
//                   src={moment.image}
//                   alt={moment.caption}
//                   className="w-full h-auto object-cover"
//                 />
//                 {moment.type === 'tiktok' && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
//                       <Icon name="Play" size={24} className="text-white ml-1" />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Post Content */}
//               <div className="p-4">
//                 <p className="text-foreground mb-3 leading-relaxed">
//                   {moment.caption}
//                 </p>
                
//                 {/* Product Tag */}
//                 <div className="inline-flex items-center space-x-2 bg-muted px-3 py-1 rounded-full mb-3">
//                   <Icon name="Tag" size={14} className="text-conversion" />
//                   <span className="text-sm font-medium text-text-secondary">{moment.product}</span>
//                 </div>

//                 {/* Engagement Stats */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-1">
//                       <Icon name="Heart" size={16} className="text-red-500" />
//                       <span className="text-sm font-medium text-text-secondary">
//                         {formatNumber(moment.likes)}
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-1">
//                       <Icon name="MessageCircle" size={16} className="text-text-secondary" />
//                       <span className="text-sm font-medium text-text-secondary">
//                         {formatNumber(moment.comments)}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     iconName="ExternalLink"
//                     className="text-text-secondary hover:text-conversion"
//                   >
//                     View Post
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-16">
//           <div className="bg-background rounded-2xl p-8 lg:p-12 brand-shadow">
//             <h3 className="font-brand-headline text-2xl lg:text-3xl font-bold text-foreground mb-4">
//               Share Your Teeque Moment
//             </h3>
//             <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
//               Tag us @teeque_collection and use #TeequeStyle to be featured in our community spotlight.
//             </p>
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link to="/style-lab">
//                 <Button
//                   variant="default"
//                   size="lg"
//                   className="bg-conversion text-conversion-foreground hover:bg-conversion/90 font-cta"
//                   iconName="Camera"
//                   iconPosition="left"
//                 >
//                   Style Lab
//                 </Button>
//               </Link>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="font-cta"
//                 iconName="Users"
//                 iconPosition="left"
//               >
//                 Join Community
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CulturalMoments;