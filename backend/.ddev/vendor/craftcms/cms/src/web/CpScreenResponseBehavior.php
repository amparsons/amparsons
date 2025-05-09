<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace craft\web;

use Craft;
use craft\helpers\Html;
use craft\helpers\UrlHelper;
use craft\models\Site;
use yii\base\Behavior;

/**
 * Control panel screen response behavior.
 *
 * @property Response $owner
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 4.0.0
 */
class CpScreenResponseBehavior extends Behavior
{
    public const NAME = 'cp-screen';

    /**
     * @var callable|null Callable that will be called before other properties are added to the screen.
     * @see prepareScreen()
     */
    public $prepareScreen = null;

    /**
     * @var string|null The control panel edit URL for this screen.
     * @see editUrl()
     */
    public ?string $editUrl = null;

    /**
     * @var string|null The document title. If null, [[title]] will be used.
     *
     * This will only be used by full-page screens.
     *
     * @see docTitle()
     */
    public ?string $docTitle = null;

    /**
     * @var string|null The page title.
     *
     * This will only be used by full-page screens.
     *
     * @see title()
     */
    public ?string $title = null;

    /**
     * @var string|null The selected subnav item’s key in the global sidebar.
     *
     * This will only be used by full-page screens.
     *
     * @see selectedSubnavItem()
     */
    public ?string $selectedSubnavItem = null;

    /**
     * @var Site|null The site that should be displayed within the breadcrumbs.
     * @see site()
     * @since 5.0.0
     */
    public ?Site $site = null;

    /**
     * @var array<Site|array{site:Site,status?:string}>|null The sites that should be selectable by the site breadcrumb menu.
     * @see selectableSites()
     * @since 5.0.0
     */
    public ?array $selectableSites = null;

    /**
     * @var array|callable|null Breadcrumbs.
     *
     * This will only be used by full-page screens.
     *
     * @see crumbs()
     * @see addCrumb()
     */
    public $crumbs = null;

    /**
     * @var array Tabs.
     *
     * @see tabs()
     * @see addTab()
     */
    public array $tabs = [];

    /**
     * @var string|null Class that should be added to the slideout body.
     * @since 4.5.0
     */
    public ?string $slideoutBodyClass = null;

    /**
     * @var array Custom attributes to add to the `<main>` tag.
     *
     * See [[\yii\helpers\BaseHtml::renderTagAttributes()]] for supported attribute syntaxes.
     *
     * This will only be used by full-page screens.
     *
     * @see mainAttributes()
     */
    public array $mainAttributes = [];

    /**
     * @var array Custom attributes to add to the `<form>` tag.
     *
     * See [[\yii\helpers\BaseHtml::renderTagAttributes()]] for supported attribute syntaxes.
     *
     * @see formAttributes()
     */
    public array $formAttributes = [];

    /**
     * @var string|null The form action.
     * @see action()
     */
    public ?string $action = null;

    /**
     * @var array|callable|null Alternate form actions.
     *
     * This will only be used by full-page screens.
     *
     * @see altActions()
     * @see addAltAction()
     */
    public $altActions = null;

    /**
     * @var string|null The URL the form should redirect to after posting.
     *
     * This will only be used by full-page screens.
     *
     * @see redirectUrl()
     */
    public ?string $redirectUrl = null;

    /**
     * @var string|null The URL the form should redirect to after posting, if submitted via the
     * <kbd>Ctrl</kbd><kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut.
     *
     * This will only be used by full-page screens.
     *
     * @see saveShortcutRedirectUrl()
     */
    public ?string $saveShortcutRedirectUrl = null;

    /**
     * @var callable|null Context menu items factory.
     * @see contextMenuItems()
     * @since 5.0.0
     */
    public $contextMenuItems = null;

    /**
     * @var string|callable|null Toolbar HTML
     * @see toolbarHtml()
     * @see toolbarTemplate()
     * @since 5.7.0
     */
    public $toolbarHtml = null;

    /**
     * @var callable|null Action menu items factory.
     * @see actionMenuItems()
     * @since 5.0.0
     */
    public $actionMenuItems = null;

    /**
     * @var string|null The submit button label.
     * @see submitButtonLabel()
     */
    public ?string $submitButtonLabel = null;

    /**
     * @var string|callable|null Additional buttons’ HTML.
     *
     * This will only be used by full-page screens.
     *
     * @see additionalButtonsHtml()
     * @see additionalButtonsTemplate()
     * @since 5.0.0
     */
    public $additionalButtonsHtml = null;

    /**
     * @var string|callable|null The content HTML.
     * @see contentHtml()
     * @see contentTemplate()
     * @since 5.0.0
     */
    public $contentHtml = null;

    /**
     * @var string|callable|null The right-hand meta sidebar HTML.
     * @see metaSidebarHtml()
     * @see metaSidebarTemplate()
     * @since 5.0.0
     */
    public $metaSidebarHtml = null;

    /**
     * @var string|callable|null The left-hand page sidebar HTML (only used by full-page screens).
     * @see pageSidebarHtml()
     * @see pageSidebarTemplate()
     * @since 5.0.0
     */
    public $pageSidebarHtml = null;

    /**
     * @var string|callable|null The content notice HTML.
     * @see noticeHtml()
     * @see noticeTemplate()
     * @since 5.0.0
     */
    public $noticeHtml = null;

    /**
     * @var string|callable|null The errors summary HTML (DEV-212).
     * @see errorSummary()
     * @see errorSummaryTemplate()
     * @since 4.5.0
     */
    public $errorSummary = null;

    /**
     * Sets a callable that will be called before other properties are added to the screen.
     *
     * @param callable|null $value
     * @return Response
     */
    public function prepareScreen(?callable $value): Response
    {
        $this->prepareScreen = $value;
        return $this->owner;
    }

    /**
     * Sets the control panel edit URL for this screen.
     *
     * @param string|null $value
     * @return Response
     */
    public function editUrl(?string $value): Response
    {
        $this->editUrl = $value;
        return $this->owner;
    }

    /**
     * Sets the document title.
     *
     * This will only be used by full-page screens.
     *
     * @param string|null $value
     * @return Response
     */
    public function docTitle(?string $value): Response
    {
        $this->docTitle = $value;
        return $this->owner;
    }

    /**
     * Sets the page title.
     *
     * This will only be used by full-page screens.
     *
     * @param string|null $value
     * @return Response
     */
    public function title(?string $value): Response
    {
        $this->title = $value;
        return $this->owner;
    }

    /**
     * Sets the selected subnav item’s key in the global sidebar.
     *
     * This will only be used by full-page screens.
     *
     * @param string|null $value
     * @return Response
     */
    public function selectedSubnavItem(?string $value): Response
    {
        $this->selectedSubnavItem = $value;
        return $this->owner;
    }

    /**
     * Sets the breadcrumbs.
     *
     * Breadcrumbs should be defined by arrays with the following keys:
     *
     * - `label` – The breadcrumb label, to be HTML-encoded
     * - `url` – The URL that the breadcrumb should link to
     * - `icon` – The icon which should be displayed beside the label
     * - `menu` – The menu items which should be displayed alongside the breadcrumb
     *   (see [[\craft\helpers\Cp::disclosureMenu()]] for documentation on supported item properties)
     * - `current` – Whether the breadcrumb represents the current page
     *
     * This will only be used by full-page screens.
     *
     * @param callable|array|null $value
     * @return Response
     */
    public function crumbs(callable|array|null $value): Response
    {
        $this->crumbs = $value;
        return $this->owner;
    }

    /**
     * Adds a breadcrumb.
     *
     * This will only be used by full-page screens.
     *
     * @param string $label
     * @param string $url
     * @return Response
     */
    public function addCrumb(string $label, string $url): Response
    {
        if (!is_array($this->crumbs)) {
            $this->crumbs = [];
        }
        $this->crumbs[] = [
            'label' => $label,
            'url' => UrlHelper::cpUrl($url),
        ];
        return $this->owner;
    }

    /**
     * Sets the site that should be displayed within the breadcrumbs.
     *
     * @param Site|null $value
     * @return Response
     * @since 5.0.0
     */
    public function site(?Site $value): Response
    {
        $this->site = $value;
        return $this->owner;
    }

    /**
     * Sets the sites that should be selectable by the site breadcrumb menu.
     *
     * @param array<Site|array{site:Site,status?:string}>|null $value
     * @return Response
     * @since 5.0.0
     */
    public function selectableSites(?array $value): Response
    {
        $this->selectableSites = $value;
        return $this->owner;
    }

    /**
     * Sets the tabs.
     *
     * Each tab should be represented by a nested array with the following keys:
     *
     * - `label` – The human-facing tab label.
     * - `url` – The `href` attribute of the tab’s anchor. Set to `#container-ids` if the tabs are meant to toggle in-page content.
     * - `class` _(optional)_ - Class name(s) that should be added to the tab’s anchor.
     * - `visible` _(optional)_ – Whether the tab should be initially visible (defaults to `true`).
     *
     * If the tabs are meant to toggle in-page content, the array keys should be set to the `id` attributes of the
     * container elements they represent.
     *
     * @param array $value
     * @return Response
     */
    public function tabs(array $value): Response
    {
        $this->tabs = $value;
        return $this->owner;
    }

    /**
     * Adds a tab.
     *
     * @param string $id
     * @param string $label
     * @param string $url
     * @param string|string[]|null $class
     * @param bool $visible
     * @return Response
     */
    public function addTab(string $id, string $label, string $url, array|string $class = null, bool $visible = true): Response
    {
        $this->tabs[$id] = [
            'label' => $label,
            'url' => $url,
            'class' => Html::explodeClass($class),
            'visible' => $visible,
        ];
        return $this->owner;
    }

    /**
     * Sets custom attributes that should be added to the `<main>` tag.
     *
     * See [[\yii\helpers\BaseHtml::renderTagAttributes()]] for supported attribute syntaxes.
     *
     * This will only be used by full-page screens.
     *
     * @param array $value
     * @return Response
     */
    public function mainAttributes(array $value): Response
    {
        $this->mainAttributes = $value;
        return $this->owner;
    }

    /**
     * Sets custom attributes that should be added to the `<form>` tag.
     *
     * See [[\yii\helpers\BaseHtml::renderTagAttributes()]] for supported attribute syntaxes.
     *
     * @param array $value
     * @return Response
     */
    public function formAttributes(array $value): Response
    {
        $this->formAttributes = $value;
        return $this->owner;
    }

    /**
     * Sets the form action.
     *
     * @param string|null $value
     * @return Response
     */
    public function action(?string $value): Response
    {
        $this->action = $value;
        return $this->owner;
    }

    /**
     * Sets alternate form actions.
     *
     * Each action should be represented by a nested array with the following keys:
     *
     * - `label` – The human-facing action label.
     * - `destructive` _(optional)_ – Whether the action should be considered destructive (defaults to `false`).
     * - `action` _(optional)_ – The controller action that should be posted to.
     * - `redirect` _(optional)_ – The URL the form should redirect to afterwards.
     * - `confirm` _(optional)_ – A confirmation message that should be shown.
     * - `params` _(optional)_ – Array of additional params that should be posted.
     * - `eventData` _(optional)_ – Additional properties that should be assigned to the JavaScript `submit` event.
     * - `shortcut` _(optional)_ – Whether the action can be triggered with a <kbd>Command</kbd>/<kbd>Ctrl</kbd> + <kbd>S</kbd> keyboard shortcut
     *   (or <kbd>Command</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> if `'shift' => true` is also set).
     * - `retainScroll` _(optional)_ – Whether the browser should retain its scroll position on the next page.
     *
     * This will only be used by full-page screens.
     *
     * @param callable|array|null $value
     * @return Response
     */
    public function altActions(callable|array|null $value): Response
    {
        $this->altActions = $value;
        return $this->owner;
    }

    /**
     * Adds an alternate form action.
     *
     * This will only be used by full-page screens.
     *
     * @param string $label
     * @param array $config
     * @return Response
     * @see altActions()
     */
    public function addAltAction(string $label, array $config): Response
    {
        if (!is_array($this->altActions)) {
            $this->altActions = [];
        }
        $this->altActions[] = ['label' => $label] + $config;
        return $this->owner;
    }

    /**
     * Sets the URL the form should redirect to after posting.
     *
     * This will only be used by full-page screens.
     *
     * @param string|null $value
     * @return Response
     */
    public function redirectUrl(?string $value): Response
    {
        $this->redirectUrl = $value;
        return $this->owner;
    }

    /**
     * Sets URL the form should redirect to after posting, if submitted via the
     * <kbd>Ctrl</kbd><kbd>Command</kbd> + <kbd>S</kbd> keyboard shortcut.
     *
     * This will only be used by full-page screens.
     *
     * @param string|null $value
     * @return Response
     */
    public function saveShortcutRedirectUrl(?string $value): Response
    {
        $this->saveShortcutRedirectUrl = $value;
        return $this->owner;
    }

    /**
     * Sets the context menu items.
     *
     * See [[\craft\helpers\Cp::disclosureMenu()]] for documentation on supported item properties.
     *
     * @param callable|null $value A callback function which returns the menu items
     * @return Response
     * @since 5.0.0
     */
    public function contextMenuItems(?callable $value): Response
    {
        $this->contextMenuItems = $value;
        return $this->owner;
    }

    /**
     * Sets the toolbar HTML.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.7.0
     */
    public function toolbarHtml(callable|string|null $value): Response
    {
        $this->toolbarHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the toolbar HTML.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     * @since 5.7.0
     */
    public function toolbarTemplate(string $template, array $variables = []): Response
    {
        return $this->toolbarHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the action menu items.
     *
     * See [[\craft\helpers\Cp::disclosureMenu()]] for documentation on supported item properties.
     *
     * @param callable|null $value A callback function which returns the menu items
     * @return Response
     * @since 5.0.0
     */
    public function actionMenuItems(?callable $value): Response
    {
        $this->actionMenuItems = $value;
        return $this->owner;
    }

    /**
     * Sets the submit button label.
     *
     * @param string|null $value
     * @return Response
     */
    public function submitButtonLabel(?string $value): Response
    {
        $this->submitButtonLabel = $value;
        return $this->owner;
    }

    /**
     * Sets the additional buttons’ HTML.
     *
     * This will only be used by full-page screens.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.0.0
     */
    public function additionalButtonsHtml(callable|string|null $value): Response
    {
        $this->additionalButtonsHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the additional buttons’ HTML.
     *
     * This will only be used by full-page screens.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     */
    public function additionalButtonsTemplate(string $template, array $variables = []): Response
    {
        return $this->additionalButtonsHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the content HTML.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.0.0
     */
    public function contentHtml(callable|string|null $value): Response
    {
        $this->contentHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the content HTML.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     */
    public function contentTemplate(string $template, array $variables = []): Response
    {
        return $this->contentHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the right-hand meta sidebar HTML.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.0.0
     */
    public function metaSidebarHtml(callable|string|null $value): Response
    {
        $this->metaSidebarHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the right-hand meta sidebar HTML.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     */
    public function metaSidebarTemplate(string $template, array $variables = []): Response
    {
        return $this->metaSidebarHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the left-hand page sidebar HTML (only used by full-page screens).
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.0.0
     */
    public function pageSidebarHtml(callable|string|null $value): Response
    {
        $this->pageSidebarHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the left-hand page sidebar HTML (only used by full-page screens).
     *
     * @param string $template
     * @param array $variables
     * @return Response
     * @since 4.5.0
     */
    public function pageSidebarTemplate(string $template, array $variables = []): Response
    {
        return $this->pageSidebarHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the content notice HTML.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 5.0.0
     */
    public function noticeHtml(callable|string|null $value): Response
    {
        $this->noticeHtml = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the content notice HTML.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     */
    public function noticeTemplate(string $template, array $variables = []): Response
    {
        return $this->noticeHtml(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }

    /**
     * Sets the errors summary HTML.
     *
     * @param callable|string|null $value
     * @return Response
     * @since 4.5.0
     */
    public function errorSummary(callable|string|null $value): Response
    {
        $this->errorSummary = $value;
        return $this->owner;
    }

    /**
     * Sets a template that should be used to render the errors summary HTML.
     *
     * @param string $template
     * @param array $variables
     * @return Response
     * @since 4.5.0
     */
    public function errorSummaryTemplate(string $template, array $variables = []): Response
    {
        return $this->errorSummary(
            fn() => Craft::$app->getView()->renderTemplate($template, $variables, View::TEMPLATE_MODE_CP)
        );
    }
}
