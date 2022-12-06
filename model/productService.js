import db from '../config/connectDB';


let getAllProduct = async () => {
    const result = await db.connection.execute('SELECT pd.*, pt.LINK FROM product pd JOIN photo pt on pd.IDPRODUCT = pt.IDPRODUCT GROUP BY pd.IDPRODUCT HAVING COUNT(*) >= 1');
    return result[0];
};
let getFilterProduct = async (queryFilter) => {
    const {
        name: nameFilter,
        type: typeFilter,
        brand: brandFilter,
        manufacturer: manufacturerFilter,
        priceFrom: priceFrom,
        priceTo: priceTo,
        numBuy: numBuy,
        sortPrice: sortPrice,
        timeCreate: timeCreate,
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT * FROM manufacturer m, type t, brand b, product pd JOIN photo pt on pd.IDPRODUCT = pt.IDPRODUCT WHERE m.IDMANUFACTURER = pd.IDMANUFACTURER AND t.IDTYPE = pd.IDTYPE AND b.IDBRAND = pd.IDBRAND GROUP BY pd.IDPRODUCT HAVING COUNT(*) >= 1 ';
    if (nameFilter && typeof nameFilter === 'string') {
        sql += 'AND NAMEPRODUCT like ? ';
        values.push(`%${nameFilter}%`)
    }
    else if (nameFilter) {
        sql += 'AND (';
        for (let i = 0; i < nameFilter.length; i++) {
            if (nameFilter.length - 1 == i) {
                sql += 'NAMEPRODUCT like ?';
                values.push(`%${nameFilter[i]}%`)
            }

            else {
                sql += 'NAMEPRODUCT like ? OR ';
                values.push(`%${nameFilter[i]}%`)
            }

        }
        sql += ')';
    }
    if (typeFilter && typeof typeFilter === 'string') {
        sql += 'AND NAMETYPE like ? ';
        values.push(`%${typeFilter}%`)
    }
    else if (typeFilter) {
        sql += 'AND (';
        for (let i = 0; i < typeFilter.length; i++) {
            if (typeFilter.length - 1 == i) {
                sql += 'NAMETYPE like ?';
                values.push(`%${typeFilter[i]}%`)
            }

            else {
                sql += 'NAMETYPE like ? OR ';
                values.push(`%${typeFilter[i]}%`)
            }

        }
        sql += ')';
    }
    if (brandFilter && typeof brandFilter === 'string') {
        sql += 'AND NAMEBRAND like ? ';
        values.push(`%${brandFilter}%`)
    }
    else if (brandFilter) {
        sql += 'AND (';
        for (let i = 0; i < brandFilter.length; i++) {
            if (brandFilter.length - 1 == i) {
                sql += 'NAMEBRAND like ?';
                values.push(`%${brandFilter[i]}%`)
            }

            else {
                sql += 'NAMEBRAND like ? OR ';
                values.push(`%${brandFilter[i]}%`)
            }

        }
        sql += ')';
    }
    if (manufacturerFilter && typeof manufacturerFilter === 'string') {
        sql += 'AND NAMEMANUFACTURER like ? ';
        values.push(`%${manufacturerFilter}%`)
    }
    else if (manufacturerFilter) {
        sql += 'AND (';
        for (let i = 0; i < manufacturerFilter.length; i++) {
            if (manufacturerFilter.length - 1 == i) {
                sql += 'NAMEMANUFACTURER like ?';
                values.push(`%${manufacturerFilter[i]}%`)
            }

            else {
                sql += 'NAMEMANUFACTURER like ? OR ';
                values.push(`%${manufacturerFilter[i]}%`)
            }

        }
        sql += ')';
    }
    if (priceFrom && typeof priceFrom === 'string') {
        sql += 'AND PRICE >= ? ';
        values.push(parseFloat(priceFrom))
    }
    if (priceTo && typeof priceTo === 'string' && priceTo >= priceFrom) {
        sql += 'AND PRICE <= ? ';
        values.push(parseFloat(priceTo))
    }
    const result = await db.connection.execute(sql, values);
    return result[0];
}
let getAllType = async () => {
    const result = await db.connection.execute('SELECT * FROM `type`');
    //console.log(rows);
    return result[0];
};
let getAllBrand = async () => {
    const result = await db.connection.execute('SELECT * FROM `brand`');
    //console.log(rows);
    return result[0];
};
let getAllManufacturer = async () => {
    const result = await db.connection.execute('SELECT * FROM `manufacturer`');
    //console.log(result[0]);
    return result[0];
};
let getAllPhoto = async () => {
    const result = await db.connection.execute('SELECT * FROM `photo`');
    //console.log(rows);
    return result[0];
};
let getDetailProduct = async (id) => {
    const result = await db.connection.execute('SELECT pd.*, br.NAMEBRAND, manu.NAMEMANUFACTURER, mt.NAMEMATERIAL, pt.LINK, rm.NUMREMAIN, ori.NAMEORIGIN  FROM product pd JOIN photo pt ON pt.IDPRODUCT = pd.IDPRODUCT JOIN brand br ON br.IDBRAND = pd.IDBRAND JOIN manufacturer manu ON manu.IDMANUFACTURER = pd.IDMANUFACTURER JOIN material mt ON mt.IDMATERIAL = pd.IDMATERIAL JOIN remain rm ON rm.IDREMAIN = pd.IDREMAIN JOIN origin ori ON ori.IDORIGIN = pd.IDORIGIN WHERE pd.IDPRODUCT = ?', [parseInt(id)]);

    return result[0];

}
let getRelatedProducts = async (id) => {
    const result = await db.connection.execute('SELECT pd.*, pt.LINK FROM product pd JOIN photo pt ON pt.IDPRODUCT = pd.IDPRODUCT JOIN type tp ON tp.IDTYPE = pd.IDTYPE WHERE pd.IDPRODUCT = ? GROUP BY pd.IDPRODUCT HAVING COUNT(*) >= 1', [parseInt(id)]);

    return result[0];

}

module.exports = {
    getAllProduct,
    getAllBrand,
    getAllManufacturer,
    getAllType,
    getAllPhoto,
    getFilterProduct,
    getDetailProduct,
    getRelatedProducts
}