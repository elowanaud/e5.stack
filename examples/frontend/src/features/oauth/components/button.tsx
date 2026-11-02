import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@workspace/ui-react/components/button";
import { Spinner } from "@workspace/ui-react/components/spinner";
import { GithubIcon } from "@workspace/ui-react/icons";

import { client } from "#/libs/tuyau";

type ContinueWithButtonProps = {
	provider: "github";
};

export function ContinueWithButton({ provider }: ContinueWithButtonProps) {
	const redirectUrl = `${import.meta.env.VITE_API_BASE_URL}${client.urlFor("frontend.oauth.redirect", { provider })}`;

	const [isRedirecting, setIsRedirecting] = useState(false);

	const { t } = useTranslation("features.oauth.components.button");
	const navigate = useNavigate();

	const handleClick = async () => {
		setIsRedirecting(true);
		navigate({ href: redirectUrl });
	};

	const renderIcon = () => {
		if (provider === "github") {
			return <GithubIcon className="size-6!" />;
		}

		return null;
	};

	return (
		<Button onClick={handleClick} disabled={isRedirecting}>
			{isRedirecting ? <Spinner /> : renderIcon()}
			{t(provider)}
		</Button>
	);
}
