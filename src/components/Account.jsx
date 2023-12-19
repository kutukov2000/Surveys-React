import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { MailIcon } from './Icons/MailIcon.jsx';
import { LockIcon } from './Icons/LockIcon.jsx';
import { login, logout, selectIsLoggined, selectToken } from "../store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AccountService from "./Services/AccountService.js";

export default function Account() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const submitForm = async (data) => {
        const token = await AccountService.Login(data);
        const user = data;

        dispatch(login({ user, token }));
    }

    const token = useSelector(selectToken);
    console.log('Token is: ', token);

    const isLogged = useSelector(selectIsLoggined);
    console.log(isLogged);

    return (
        <div>
            {!isLogged ? (
                <Button onPress={onOpen} color="primary"> Login </Button>
            ) : (
                <Button onPress={() => dispatch(logout())} color="secondary"> Logout </Button>
            )}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(submitForm)}>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Email"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    {...register('email')}
                                    required
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                    {...register('password')}
                                    required
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" color="primary" onPress={onClose}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}