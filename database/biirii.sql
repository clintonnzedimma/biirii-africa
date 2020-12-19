-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2020 at 05:25 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biirii`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', 'admin@biiriiafrica.com', '$2b$11$TeAvhw.fpvapiAdB/NQw1.jOZAyEo9.7ScI3vrFUbCpMX1fn2Li8O');

-- --------------------------------------------------------

--
-- Table structure for table `all_orders`
--

CREATE TABLE `all_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `add_info` varchar(255) DEFAULT NULL,
  `is_not_pip` int(11) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL,
  `is_paid` int(11) DEFAULT NULL,
  `is_delivered` varchar(255) DEFAULT NULL,
  `zone_name` varchar(255) DEFAULT NULL,
  `zone_desc` varchar(255) DEFAULT NULL,
  `zone_price` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `super_category_id` int(11) DEFAULT NULL,
  `super_category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `time_added`, `time_updated`, `main_img`, `slug`, `super_category_id`, `super_category`) VALUES
(1, 'Tee Shirts', 1592301690672, 1592683446945, 'biirii-1908c56b-f4b9-423c-9e7c-8acfe52e28ab.jpeg', 'male-tee-shirts', 1, 'men'),
(2, 'Tops for men', 1592302217083, NULL, 'biirii-314c07fc-5c03-49ba-92b9-7f314e43c21a.jpeg', 'male-tops', 1, 'men'),
(3, 'Shorts', 1592302490222, NULL, 'biirii-4b79ebd1-cf52-4bcb-931c-8a534c83b411.jpeg', 'shorts', 1, 'men'),
(4, 'Kaftans', 1592684416113, 1592684536495, 'biirii-d34c8557-3a7c-416b-b228-e0c68fc4dce1.jpeg', 'kaftans', 1, 'men'),
(5, 'Jackets', 1592686371696, NULL, 'biirii-a0c57cda-b125-414b-a82e-9426d455719d.jpeg', 'jackets', 1, 'men'),
(6, 'Jackets & Blazers', 1592687296525, NULL, 'biirii-4f58a434-4bbf-4b04-b986-5dd7820098e0.jpeg', 'jackets-and-blazers', 1, 'men'),
(7, 'Skirts', 1592694824250, NULL, 'biirii-090ba946-bacb-42d8-a2ac-fa69f8d92756.jpeg', 'skirts', 2, 'women'),
(8, 'Tops for ladies', 1592694919712, NULL, 'biirii-a427e03f-6ef8-4a65-81ae-91dde42806d1.jpeg', 'female-tops', 2, 'women'),
(9, 'Dress', 1592695053235, NULL, 'biirii-2124d720-fdd5-44c3-a604-5d03ce14f400.jpeg', 'dress', 2, 'women'),
(10, 'Jumpsuits', 1592695092421, NULL, 'biirii-43bcd8a6-b805-4767-8555-9db672377b7e.jpeg', 'jumpsuits', 2, 'women'),
(11, 'Shirts', 1592695148230, NULL, 'biirii-c5e94682-07b0-4c27-87fb-3fc5bf980d2c.jpeg', 'female-shirts', 2, 'women'),
(12, 'Gowns', 1592695863071, NULL, 'biirii-eb86482c-9931-42b5-9022-ea754e138af5.jpeg', 'gowns', 2, 'women'),
(13, 'Tee Shirts', 1592696710401, NULL, 'biirii-72bce3f1-2a7e-470c-a1e4-d4595e011c27.jpeg', 'female-tee-shirts', 2, 'women'),
(14, 'Blouses', 1592696938078, 1592736666690, 'biirii-82cb84d4-0fa5-4757-9ff4-bea6eab1e1e2.jpeg', 'blouses', 2, 'women'),
(15, 'Belts', 1592762783593, NULL, 'biirii-571ed2ef-06b8-4009-bf8c-aa658288d62d.jpeg', 'belts', 3, 'accessories'),
(16, 'Ties', 1592763186325, NULL, 'biirii-1e65f892-6a77-4ead-b5a6-0898f1712948.jpeg', 'ties', 3, 'accessories'),
(17, 'Shoes', 1592763887723, NULL, 'biirii-eea0cb1b-26af-4eb8-b137-b01ca434fb3c.jpeg', 'shoes', 1, 'men'),
(18, 'Bags', 1592764036947, NULL, 'biirii-5db01ee0-f499-4fdb-b3b5-55d4cfae5694.jpeg', 'bags', 3, 'accessories'),
(19, 'Caps & Hats', 1592766394924, 1592766417952, 'biirii-b3431378-f784-47f0-bd08-4751d0c98b1c.jpeg', 'caps-and-hats', 3, 'accessories'),
(20, 'Socks', 1592767419301, NULL, 'biirii-93738640-5294-492f-977b-dd1ae07132a6.jpeg', 'socks', 3, 'accessories');

-- --------------------------------------------------------

--
-- Table structure for table `delivered_orders`
--

CREATE TABLE `delivered_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `paid_orders`
--

CREATE TABLE `paid_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `txn_ref` varchar(255) DEFAULT NULL,
  `add_info` varchar(255) DEFAULT NULL,
  `is_not_pip` int(11) DEFAULT NULL,
  `shipping_method` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL,
  `zone_name` varchar(255) DEFAULT NULL,
  `zone_desc` varchar(255) DEFAULT NULL,
  `zone_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `is_available` int(11) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `pKey` varchar(255) DEFAULT NULL,
  `super_category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `category_id`, `time_added`, `time_updated`, `is_available`, `main_img`, `slug`, `pKey`, `super_category`) VALUES
(1, 'Gucci shoe', NULL, 'Quality Gucci Designers Shoe Size: 42, 43, 44 and 45', 17, 1592909207223, NULL, NULL, 'biirii-ffe3de27-4395-4c76-9bc5-43ffafcefe76.jpeg', 'gucci-shoe', '6C6', NULL),
(2, 'Ankara Male Jacket', NULL, 'Nice jacket', 6, 1592911522723, NULL, NULL, 'biirii-d13e93df-fad8-4706-b9e8-1c4aaa67cbd3.jpeg', 'ankara-male-jacket', 'F8B', NULL),
(3, 'Kaftan', NULL, 'nice kaftan', 4, 1592913264515, NULL, NULL, 'biirii-b082908b-dfcb-43b5-b1f6-e110615ea379.jpeg', 'kaftan', '437', NULL),
(4, 'Ankara skirt', NULL, 'Nice skirts', 7, 1592913549175, NULL, NULL, 'biirii-5955db19-8ddb-4d72-bdfd-64d60e6d528b.jpeg', 'ankara-skirt', '85D', NULL),
(5, 'Ankara shorts', NULL, 'Nice shorts', 3, 1592913722887, NULL, NULL, 'biirii-2d86b216-b3e2-4d0a-8961-8837a7489f41.jpeg', 'ankara-shorts', '744', NULL),
(6, 'Ankara Male Top', NULL, 'Nice Ankara top', 2, 1592913896277, NULL, NULL, 'biirii-38d10b28-bc3a-4689-b72b-270b5c540837.jpeg', 'ankara-male-top', '90A', NULL),
(7, 'Male Tee shirts ', NULL, 'Nice Tees', 1, 1592914375489, NULL, NULL, 'biirii-c2dabe6a-ca2b-4041-bab0-95c61ab79f6b.jpeg', 'male-tee-shirts', '620', NULL),
(8, 'Male Kaftan', NULL, 'Nice Kaftan', 4, 1592914465513, NULL, NULL, 'biirii-3effb52e-eecf-4a82-981f-862d386719b7.jpeg', 'male-kaftan', '4CD', NULL),
(9, 'Blouse Ankara', NULL, 'Nice blouse', 14, 1592914695541, NULL, NULL, 'biirii-88ae208f-47a7-4561-b6ee-32a6570788eb.jpeg', 'blouse-ankara', 'CD1', NULL),
(10, 'women tees', NULL, 'Nice tee', 13, 1592914886895, 1592915064845, NULL, 'biirii-fc1464fb-ed51-4129-866a-470bf2faf78c.jpeg', 'women-tees', '087', NULL),
(11, 'women gown', NULL, 'women gown', 12, 1592915147031, NULL, NULL, 'biirii-c5942e00-1506-4972-a2eb-54bfefa7c193.jpeg', 'women-gown', '35A', NULL),
(12, 'Women shirt', NULL, 'nice shirt', 11, 1592915276520, 1592915292699, NULL, 'biirii-0e95ba94-ba69-4028-aba9-cb6b18917ffe.jpeg', 'women-shirt', 'A09', NULL),
(13, 'Women Jump suits', NULL, 'Nice Jumpsuits', 10, 1592915365079, 1592915378151, NULL, 'biirii-9d9db194-1963-4e86-8332-fe51d06b6fea.jpeg', 'women-jump-suits', '601', NULL),
(14, 'Women dress', NULL, 'Nice dress', 9, 1592915463184, 1592915477885, NULL, 'biirii-e38980d4-df29-49c2-a0ba-c90fec0c0360.jpeg', 'women-dress', '1BC', NULL),
(15, 'Women Top', NULL, 'Nice top', 8, 1592915594829, 1592915605578, NULL, 'biirii-d1872ba2-1661-4679-8ef9-0bd3dc1b42c8.jpeg', 'women-top', '2CA', NULL),
(16, 'Women Skirts', NULL, 'Nice Women Skirts', 7, 1592915676757, 1592915688718, NULL, 'biirii-598d305d-4a61-4fdc-a014-d539fde9425f.jpeg', 'women-skirts', '292', NULL),
(17, 'Socks', NULL, 'Nice socks', 20, 1592915751303, 1592915761949, NULL, 'biirii-1f7d3d88-3b0d-43ef-a050-3065da31cf48.jpeg', 'socks', '025', NULL),
(18, 'Hat', NULL, 'Nice hat', 19, 1592915844607, NULL, NULL, 'biirii-515f39ff-80f4-4d02-9b70-3d2c4f279475.jpeg', 'hat', 'B89', NULL),
(19, 'Bag', NULL, 'Nice bag', 18, 1592916295563, 1592916310948, NULL, 'biirii-d26f0fc7-7c07-43ab-8446-6659732626c8.jpeg', 'bag', '31E', NULL),
(20, 'Ties', NULL, 'Nice tie', 16, 1592916366081, 1592916378645, NULL, 'biirii-42dd4e2e-7d4c-41ff-aae8-33765bdbc3c1.jpeg', 'ties', 'BE7', NULL),
(21, 'Belt', NULL, 'Belt', 15, 1592916476327, 1592916488462, NULL, 'biirii-07668c9b-ab14-4500-b610-c7a940a890e9.jpeg', 'belt', '076', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pKey` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `order_key` varchar(255) DEFAULT NULL,
  `product_order_key` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `sub_product_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `discount_code` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_products`
--

CREATE TABLE `sub_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_key` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `is_available` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_products`
--

INSERT INTO `sub_products` (`id`, `name`, `price`, `description`, `product_id`, `product_key`, `time_added`, `time_updated`, `is_available`) VALUES
(1, '*', 15000, NULL, 2, 'F8B', 1592912453666, NULL, NULL),
(2, '*', 10000, NULL, 3, '437', 1592913278932, NULL, NULL),
(3, '*', 12000, NULL, 4, '85D', 1592913560103, NULL, NULL),
(4, '*', 9000, NULL, 5, '744', 1592913741060, NULL, NULL),
(5, '*', 7000, NULL, 6, '90A', 1592913903865, NULL, NULL),
(6, '*', 7000, NULL, 7, '620', 1592914384187, NULL, NULL),
(7, '*', 10000, NULL, 8, '4CD', 1592914477657, NULL, NULL),
(8, '*', 7000, NULL, 9, 'CD1', 1592914703010, NULL, NULL),
(9, '*', 6000, NULL, 10, '087', 1592914903618, NULL, NULL),
(10, '*', 5788, NULL, 11, '35A', 1592915153422, NULL, NULL),
(11, '*', 7994, NULL, 12, 'A09', 1592915285842, NULL, NULL),
(12, '*', 8990, NULL, 13, '601', 1592915372968, NULL, NULL),
(13, '*', 10000, NULL, 14, '1BC', 1592915472037, NULL, NULL),
(14, '*', 7000, NULL, 15, '2CA', 1592915601093, NULL, NULL),
(15, '*', 8990, NULL, 16, '292', 1592915683936, NULL, NULL),
(16, '*', 8000, NULL, 17, '025', 1592915757959, NULL, NULL),
(17, '*', 0, NULL, 18, 'B89', 1592915848239, NULL, NULL),
(18, '*', 8000, NULL, 19, '31E', 1592916305970, NULL, NULL),
(19, '*', 6090, NULL, 20, 'BE7', 1592916373914, NULL, NULL),
(20, '*', 7000, NULL, 21, '076', 1592916482985, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `super_categories`
--

CREATE TABLE `super_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `super_categories`
--

INSERT INTO `super_categories` (`id`, `name`, `slug`) VALUES
(1, 'Men', 'men'),
(2, 'Women', 'women'),
(3, 'Accessories', 'accessories');

-- --------------------------------------------------------

--
-- Table structure for table `tag_of_products`
--

CREATE TABLE `tag_of_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pKey` varchar(255) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `all_orders`
--
ALTER TABLE `all_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uri` (`slug`);

--
-- Indexes for table `delivered_orders`
--
ALTER TABLE `delivered_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

--
-- Indexes for table `paid_orders`
--
ALTER TABLE `paid_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_key` (`order_key`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pKey` (`pKey`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_products`
--
ALTER TABLE `sub_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `super_categories`
--
ALTER TABLE `super_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag_of_products`
--
ALTER TABLE `tag_of_products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `all_orders`
--
ALTER TABLE `all_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `delivered_orders`
--
ALTER TABLE `delivered_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paid_orders`
--
ALTER TABLE `paid_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_orders`
--
ALTER TABLE `product_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_products`
--
ALTER TABLE `sub_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `super_categories`
--
ALTER TABLE `super_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tag_of_products`
--
ALTER TABLE `tag_of_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2020 at 08:21 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: biirii
--

-- --------------------------------------------------------

--
-- Table structure for table brands
--

CREATE TABLE brands (
  id int(11) NOT NULL,
  name varchar(255) DEFAULT NULL,
  main_img varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  slug varchar(255) DEFAULT NULL,
  time_added bigint(20) DEFAULT NULL,
  time_updated bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table brands
--

INSERT INTO brands (id, name, main_img, email, slug, time_added, time_updated) VALUES
(1, 'Akpos Okudu', NULL, NULL, 'akpos-okudu', 1593684537437, NULL),
(2, 'Pleo Gabani', NULL, NULL, 'pleo-gabani', 1593684537437, NULL),
(3, 'Mosun Ogunnusi', NULL, NULL, 'mosun-ogunnusi', 1593684537437, NULL),
(4, 'Pendo Designs', NULL, NULL, 'pendo-designs', 1593684537437, NULL),
(5, 'Ogemallen', NULL, NULL, 'ogemallen', 1593684537437, NULL),
(6, 'House of Bo', NULL, NULL, 'house-of-bo', 1593684537437, NULL),
(7, 'Ghian Couture', NULL, NULL, 'ghian-couture', 1593684537437, NULL),
(8, 'Stylesbynerd', NULL, NULL, 'stylesbynerd', 1593684537437, NULL),
(9, 'Zateemee', NULL, NULL, 'zateemee', 1593684537437, NULL),
(10, 'Sammies Couture', NULL, NULL, 'sammies-couture', 1593684537437, NULL),
(11, 'Minengiby', NULL, NULL, 'minengiby', 1596133297211, NULL),
(12, 'Black Billionaire', NULL, NULL, 'black-billionaire', 1596133297211, NULL),
(13, 'Scillas By Osaki', NULL, NULL, 'scillas-by-osaki', 1596133297211, NULL),
(14, 'Viona Culture', NULL, NULL, 'viona-culture', 1596133297211, NULL),
(15, 'Victor Kwesi', NULL, NULL, 'victor-kwesi', 1596133297211, NULL),
(16, 'Cute Cut By Joy', NULL, NULL, 'cute-cut-by-joy', 1596133297211, NULL),
(17, 'Menji', NULL, NULL, 'menji', 1596133297211, NULL),
(18, 'Nike', 'biirii-0c675f9a-edfd-46b4-a28f-a71ed3b87b6a.jpeg', NULL, 'nike', 1596392196463, 1597254086310),
(19, 'Adidas', NULL, NULL, 'adidas', 1596392983874, 1596393637875),
(20, 'ABC', 'biirii-48d92598-9c35-4fc3-b7de-e5bb777e595e.jpeg', NULL, 'abc', 1597139497778, 1597145969751),
(21, 'XYZa', 'biirii-95f30477-dd00-4c9a-b315-01824f5059a7.jpeg', NULL, 'xyza', 1597311720735, 1597311796378),
(22, 'PQR', NULL, NULL, 'pqr', 1597312061927, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table brands
--
ALTER TABLE brands
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table brands
--
ALTER TABLE brands
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;


-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2020 at 09:02 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Database: `biirii`
--
-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `time_added` bigint(20) DEFAULT NULL,
  `time_updated` bigint(20) DEFAULT NULL,
  `out_of_stock` int(11) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `pKey` varchar(255) DEFAULT NULL,
  `discount_percent` int(11) NOT NULL DEFAULT 0,
  `brand_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Indexes for dumped tables
--
--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pKey` (`pKey`),
  ADD UNIQUE KEY `slug` (`slug`);
--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;