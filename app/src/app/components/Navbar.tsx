import Link from 'next/link'
import { useGlobalContext } from '../Context/store'
import { useSearchParams } from 'next/navigation';

const Navbar = () => {
    var userToken = "";
    var userCartCount = 0;
    const { token, cartCount } = useGlobalContext();
    const params = useSearchParams();

    if (token == "") {
        userToken = params.get('token')!;
    } else {
        userToken = token;
    }
    if (params.get('cartCount') == null) {
        userCartCount = cartCount;
    } else {
        userCartCount = Number(params.get('cartCount'));
    }

    return (
        <>
            <div className='flex justify-center items-center py-2 gap-2 md:gap-6 lg:gap-12'>
                <Link className='navbar__link relative' href={`/home?token=${userToken}&cartCount=${userCartCount}`}>
                    Home
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=all&token=${userToken}&cartCount=${userCartCount}`}>
                    Gallery
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=mobile&token=${userToken}&cartCount=${userCartCount}`}>
                    Mobile
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=laptop&token=${userToken}&cartCount=${userCartCount}`}>
                    Laptop
                </Link>
                <Link className='navbar__link relative' href={`/gallery?search=ipad&token=${userToken}&cartCount=${userCartCount}`}>
                    Ipad
                </Link>
                <Link className='navbar__link relative' href={`/order?token=${userToken}&cartCount=${userCartCount}`}>
                    Order
                </Link>
            </div>
        </>
    )
}

export default Navbar
