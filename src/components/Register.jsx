import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { MailIcon } from './Icons/MailIcon.jsx';
import { LockIcon } from './Icons/LockIcon.jsx';
import { login, selectIsLoggined } from "../store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AccountService from "./Services/AccountService.js";

export default function Register() {

    const isLogged = useSelector(selectIsLoggined);

    //Modal window
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const submitForm = async (data) => {
        
        if (await AccountService.Register(data)) {
            const token = await AccountService.Login(data);
            const user = data;

            dispatch(login({ user, token }));

            onClose();
        }
    }

    return (
        <div>
            {!isLogged && (
                <Button onPress={onOpen} color="primary" variant="ghost"> Register </Button>
            )}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center">
                <ModalContent>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <ModalHeader className="flex flex-col gap-1 text-uppercase">Sign up</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                variant="bordered"
                                {...register('email')}
                                required
                            />
                            {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                type="password"
                                variant="bordered"
                                {...register('password')}
                                required />
                            {errors.title && <p style={{ color: '#cc4137' }}>{errors.title.message}</p>}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button type="submit" color="primary">
                                Sign up
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    )
}