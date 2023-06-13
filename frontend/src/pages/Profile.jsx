import Button from '../components/Button';

const Profile = ({ user }) => {
	return (
		<div>
			<img src={user.picture} alt={user.name} />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<Button
				onClick={() =>
					logout({ logoutParams: { returnTo: window.location.origin } })
				}
			>
				Log out
			</Button>
		</div>
	);
};

export default Profile;
