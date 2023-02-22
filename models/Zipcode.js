const oracledb=require('./Oracle');


 let zipcodesql={

    sidosql:' select distinct sido from zipcode2013 order by sido',

    gugunsql:'  select distinct gugun from zipcode2013 where sido =:1 order by gugun',

    dongsql:'select distinct dong from zipcode2013 where sido= :1 and gugun=:2 ',

    zipsql:'select * from zipcode2013 where sido= :1 and gugun =:2 and dong =:3 order by zipcode' ,

}
class Zipcode{
     constructor() {
     }
     async getSido() {
         let conn = null;
         let params = [];
         let sidos = [];

         try {
             conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.sidosql, params,oracledb.options);
            let rs =result.resultSet;
            let row =null;
            while ((row=await rs.getRow())){
                let sido ={'sido':row.SIDO};
                sidos.push(sido);
            }
         } catch (e) {
             console.log(e)
         } finally {
             await oracledb.closeConn(conn);

         }
         return sidos;
     };
    async getGugun(sido){
         let conn = null;
         let params = [sido];
         let guguns = [];

         try {
             conn = await oracledb.makeConn();
             let result = await conn.execute(zipcodesql.gugunsql, params,oracledb.options);
             let rs =result.resultSet;

             let row =null;
             while ((row=await rs.getRow())){
                 let gugun ={'gugun':row.GUGUN};
                guguns.push(gugun);
             }


         } catch (e) {
             console.log(e)
         } finally {
             await oracledb.closeConn(conn);
         }
         return guguns;
     };
    async getDong(sido,gugun){
         let conn = null;
         let params = [sido,gugun];
         let dongs = [];
         try {
             conn = await oracledb.makeConn();

             let result = await conn.execute(zipcodesql.dongsql, params,oracledb.options);
             let rs =result.resultSet;
             let row =null;
             while ((row=await rs.getRow())){
                 let dong ={'dong':row.DONG};
                 dongs.push(dong);
             }

         } catch (e) {
             console.log(e)
         } finally {
             await oracledb.closeConn(conn);
         }
         return dongs;
     };

    async getZipcode(sido,gugun,dong) { //우편번호 알기위해서 디도 구군 동 입력
        let conn = null;
        let params = [sido,gugun,dong];
        let zips = [];

        try {
            conn = await oracledb.makeConn();

            let result = await conn.execute(zipcodesql.zipsql, params,oracledb.options);
            let rs =result.resultSet;
            let row =null;
            while ((row=await rs.getRow())){
                let zip ={'zipcode':row.ZIPCODE,'sido':row.SIDO,'gugun':row.GUGUN,'dong':row.DONG,'ri':row.RI,'bunji':row.BUNJI,}
                zips.push(zip);
            }


        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }

        return zips;
    };


};

module.exports=Zipcode;