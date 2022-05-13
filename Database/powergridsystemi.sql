-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2022 at 09:21 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `powergridsystemi`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `accountNumber` int(8) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `emailId` varchar(50) DEFAULT NULL,
  `contactNumber` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`accountNumber`, `firstName`, `lastName`, `address`, `emailId`, `contactNumber`) VALUES
(18167810, 'Aakif', 'Hifaaz', '43, 1st cross street, Colombo-1', 'aakifhif@gmail.com', 763456560),
(18168960, 'Richard', 'Fernando', '32, Senanayake Road, Kandy', 'richadfer12@gmail.com', 778789902),
(18187890, 'Dulanjani', 'Fernando', '87, Old Road, Dehiwala', 'dulfernando10@gmail.com', 774567890),
(18189054, 'Amal', 'Perera', '75/A, Woxhell Street, Colombo-6', 'amalp1996@gmail.com', 778790890);

-- --------------------------------------------------------

--
-- Table structure for table `monthly_bill`
--

CREATE TABLE `monthly_bill` (
  `billId` int(10) NOT NULL,
  `year` int(4) NOT NULL,
  `month` varchar(15) NOT NULL,
  `totalUnits` int(10) NOT NULL,
  `powId` int(10) NOT NULL,
  `accountNumber` int(8) NOT NULL,
  `dueAmount` decimal(10,2) NOT NULL,
  `billAmount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthly_bill`
--

INSERT INTO `monthly_bill` (`billId`, `year`, `month`, `totalUnits`, `powId`, `accountNumber`, `dueAmount`, `billAmount`) VALUES
(1, 2022, 'February', 80, 1, 18167810, '600.00', '1800.00'),
(2, 2022, 'February', 90, 1, 18168960, '500.00', '1850.00'),
(3, 2022, 'February', 105, 2, 18187890, '400.00', '3550.00');

-- --------------------------------------------------------

--
-- Table structure for table `power_consumption`
--

CREATE TABLE `power_consumption` (
  `powId` int(10) NOT NULL,
  `unitDescription` varchar(200) NOT NULL,
  `unitPrice` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `power_consumption`
--

INSERT INTO `power_consumption` (`powId`, `unitDescription`, `unitPrice`) VALUES
(1, 'Units-(1-100)', '15.00'),
(2, 'Units-(101-200)', '30.00'),
(3, 'Units-(201-300)', '40.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`accountNumber`);

--
-- Indexes for table `monthly_bill`
--
ALTER TABLE `monthly_bill`
  ADD PRIMARY KEY (`billId`),
  ADD UNIQUE KEY `un_mothly_bill` (`accountNumber`,`year`,`month`),
  ADD KEY `fk_monthlybill` (`powId`);

--
-- Indexes for table `power_consumption`
--
ALTER TABLE `power_consumption`
  ADD PRIMARY KEY (`powId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `monthly_bill`
--
ALTER TABLE `monthly_bill`
  MODIFY `billId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `power_consumption`
--
ALTER TABLE `power_consumption`
  MODIFY `powId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `monthly_bill`
--
ALTER TABLE `monthly_bill`
  ADD CONSTRAINT `fk_monthlybill` FOREIGN KEY (`powId`) REFERENCES `power_consumption` (`powId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_monthlybill2` FOREIGN KEY (`accountNumber`) REFERENCES `customer` (`accountNumber`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
