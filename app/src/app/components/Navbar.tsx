import Link from 'next/link'
import { useGlobalContext } from '../Context/store'
import { useSearchParams } from 'next/navigation';

const Navbar = () => {
    var userToken = "";
    var userCartCount = 0;
    const { token, cartCount } = useGlobalContext();
    const params = useSearchParams();

    let userId=0;


    if (token == "") {
        userToken = params.get('token')!;
        const base64Url = userToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
            const jsonDecode = JSON.parse(window.atob(base64));
            userId = jsonDecode.userId;
        }
    } else {
        userToken = token;
        const base64Url = userToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        if (typeof window !== 'undefined') {
            const jsonDecode = JSON.parse(window.atob(base64));
            userId = jsonDecode.userId;
        }
    }
    if (params.get('cartCount') == null) {
        userCartCount = cartCount;
    } else {
        userCartCount = Number(params.get('cartCount'));
    }

    return (
        <>
            <div className='flex justify-center items-center py-2 gap-2 md:gap-6 lg:gap-12'>
                <Link className='navbar__link relative' href={`/home?token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Home
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=all&token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Gallery
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=mobile&token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Mobile
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=laptop&token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Laptop
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=ipad&token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Ipad
                </Link>
                <Link className='navbar__link relative' href={`/order?token=${userToken}&cartCount=${userCartCount}&userId=${userId}`}>
                    Order
                </Link>
            </div>
        </>
    )
}

export default Navbar
