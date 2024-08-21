export default function CheckAuth(){
    if (localStorage.getItem('userDetails')) {
        let details = JSON.parse(localStorage.getItem('userDetails'));
        if (details.token && details.token.length > 10) {
            return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
}