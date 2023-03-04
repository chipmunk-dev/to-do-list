export const userToUserResponseDto = user => {
	const responseUserDto = { ...user };

	if ("password" in user) {
		delete responseUserDto.password;
	}

	return responseUserDto;
};
