import {SettingsPanel} from '@common/admin/settings/settings-panel';
import {Trans} from '@common/i18n/trans';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {Fragment} from 'react';
import {FormSwitch} from '@common/ui/forms/toggle/switch';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SettingsSeparator} from '@common/admin/settings/settings-separator';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {useValueLists} from '@common/http/value-lists';
import {RemoteFavicon} from '@common/ui/remote-favicon';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {useSettings} from '@common/core/settings/use-settings';

export function LinkSettings() {
  return (
    <SettingsPanel
      title={<Trans message="Links" />}
      description={
        <Trans message="Configure various link behaviour across the site." />
      }
    >
      <Tabs isLazy>
        <TabList>
          <Tab>
            <Trans message="Behaviour" />
          </Tab>
          <Tab>
            <Trans message="Security" />
          </Tab>
          <Tab>
            <Trans message="Domains" />
          </Tab>
        </TabList>
        <TabPanels className="mt-24">
          <TabPanel>
            <BehaviourFields />
          </TabPanel>
          <TabPanel>
            <SecurityFields />
          </TabPanel>
          <TabPanel>
            <DomainFields />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SettingsPanel>
  );
}

function BehaviourFields() {
  return (
    <Fragment>
      <FormSwitch
        className="mb-24"
        name="client.links.enable_type"
        description={
          <Trans message="Whether user should be able to change type when creating or updating links." />
        }
      >
        <Trans message="Link type selection" />
      </FormSwitch>
      <FormSelect
        className="mb-24"
        name="client.links.default_type"
        label={<Trans message="Default link type" />}
        selectionMode="single"
        description={
          <Trans message="What type should newly created links have by default (If user did not manually select type)." />
        }
      >
        <Item value="direct">
          <Trans message="Direct" />
        </Item>
        <Item value="frame">
          <Trans message="Frame" />
        </Item>
        <Item value="splash">
          <Trans message="Splash" />
        </Item>
      </FormSelect>
      <div className="mb-24">
        <div className="flex items-center gap-24">
          <FormTextField
            className="flex-auto"
            required
            name="client.links.min_len"
            type="number"
            min={1}
            label={<Trans message="Link min length" />}
          />
          <FormTextField
            className="flex-auto"
            required
            name="client.links.max_len"
            type="number"
            label={<Trans message="Link max length" />}
            min={1}
            max={2000}
          />
        </div>
        <div className="text-muted text-xs pt-10">
          <Trans message="Minimum and maximum length for urls that users will be able to shorten" />
        </div>
      </div>
      <div className="mb-24">
        <div className="flex items-center gap-24 mb-24">
          <FormTextField
            className="flex-auto"
            required
            name="client.links.alias_min"
            type="number"
            min={1}
            label={<Trans message="Alias min length" />}
          />
          <FormTextField
            className="flex-auto"
            required
            name="client.links.alias_max"
            type="number"
            label={<Trans message="Alias max length" />}
            min={1}
            max={50}
          />
        </div>
        <FormSelect
          name="client.links.alias_content"
          selectionMode="single"
          label={<Trans message="Alias content" />}
        >
          <Item value="alpha_dash">
            <Trans message="Numbers, letters, underscore and dash" />
          </Item>
          <Item value="alpha_num">
            <Trans message="Numbers or letters" />
          </Item>
          <Item value="alpha">
            <Trans message="Letters only" />
          </Item>
          <Item value="numeric">
            <Trans message="Numbers only" />
          </Item>
        </FormSelect>
        <div className="text-muted text-xs pt-10">
          <Trans
            message="Minimum and maximum length as well as what characters link alias are allowed to
            contain."
          />
        </div>
      </div>
      <SettingsSeparator />
      <FormSwitch
        className="mb-24"
        name="client.links.retargeting"
        description={
          <Trans message="Whether redirection based on location, device or platform is enabled." />
        }
      >
        <Trans message="Link retargeting" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.links.pixels"
        description={
          <Trans message="Whether user should be able to apply tracking pixels to links." />
        }
      >
        <Trans message="Tracking pixels" />
      </FormSwitch>
      <FormTextField
        required
        name="client.links.redirect_time"
        type="number"
        label={<Trans message="Splash page redirect time" />}
        min={0}
        max={60}
        description={
          <Trans message="After how many seconds should user be redirect to their destination on splash page. In seconds. 0 will disable automatic redirection." />
        }
      />
      <SettingsSeparator />
      <FormSwitch
        className="mb-24"
        name="client.links.homepage_creation"
        description={
          <Trans message="Whether non-logged in users can shorten links on homepage." />
        }
      >
        <Trans message="Homepage link shortening" />
      </FormSwitch>
      <FormSelect
        name="client.links.home_expiration"
        selectionMode="single"
        label={<Trans message="Expire links created from homepage" />}
      >
        <Item value={0}>
          <Trans message="Never" />
        </Item>
        <Item value="1day">
          <Trans message="After one day" />
        </Item>
        <Item value="3days">
          <Trans message="After three days" />
        </Item>
        <Item value="7days">
          <Trans message="After a week" />
        </Item>
      </FormSelect>
      <SettingsSeparator />
      <FormSwitch
        className="mb-24"
        name="client.links.homepage_stats"
        description={
          <Trans message="Whether statistics about about number of links, clicks and users should be displayed on homepage." />
        }
      >
        <Trans message="Show homepage stats" />
      </FormSwitch>
      <FormSwitch className="mb-24" name="client.links.dash_footer">
        <Trans message="Show Footer in Dashboard" />
      </FormSwitch>
    </Fragment>
  );
}

function SecurityFields() {
  return (
    <Fragment>
      <FormTextField
        inputElementType="textarea"
        rows={3}
        className="mb-24"
        name="client.links.blacklist.keywords"
        label={<Trans message="Blacklist Keywords" />}
        description={
          <Trans message="Comma separated list of keywords. User will not be able to shorten any URLs that contain specified keywords." />
        }
      />
      <FormTextField
        inputElementType="textarea"
        rows={3}
        className="mb-24"
        name="client.links.blacklist.domains"
        label={<Trans message="Blacklist Domains" />}
        description={
          <Trans message="Comma separated domain list (domain1.com, domain2.com etc.). User will not be able to shorten any URLs from specified domains." />
        }
      />
      <FormTextField
        className="mb-24"
        name="client.links.google_safe_browsing_key"
        label={<Trans message="Google safe browsing API key" />}
        description={
          <Trans
            message="<a>Google safe browsing</a> will prevent urls that are considered unsafe by google from being shortened. It is recommended to use this in order to prevent the site from being marked as deceptive."
            values={{
              a: parts => (
                <a
                  className={LinkStyle}
                  href="https://safebrowsing.google.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  {parts}
                </a>
              ),
            }}
          />
        }
      />
      <FormTextField
        className="mb-24"
        name="client.links.phishtank_key"
        label={<Trans message="Phishtank API key" />}
        description={
          <Trans
            message="Works the same way as google safe browsing service, but uses <a>Phishtank</a> instead."
            values={{
              a: parts => (
                <a
                  className={LinkStyle}
                  href="https://phishtank.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  {parts}
                </a>
              ),
            }}
          />
        }
      />
    </Fragment>
  );
}

function DomainFields() {
  return (
    <Fragment>
      <DefaultHostSelect />
      <FormSwitch
        className="mb-24"
        name="client.custom_domains.allow_select"
        description={
          <Trans message="Allow users to manually select which domain to use when shortening links (if there are multiple domains)." />
        }
      >
        <Trans message="Domain selection" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.custom_domains.allow_all_option"
        description={
          <Trans message="Allow short links to be accessible via all domains user has access to. With this option off, short links will only be accessible via default domain selected above, or domain user selected when shortening a link." />
        }
      >
        <Trans message="Link access via multiple domains" />
      </FormSwitch>
      <FormSwitch
        name="client.links.subdomain_matching"
        description={
          <Trans message="When this is enabled, links will be accessible via “linkId.site.com“ and “site.com/linkId“ short urls." />
        }
      >
        <Trans message="Subdomain link matching" />
      </FormSwitch>
    </Fragment>
  );
}

function DefaultHostSelect() {
  const {data} = useValueLists(['domains']);
  const {base_url} = useSettings();

  const domains: {id: number; host: string}[] = data?.domains || [];

  return (
    <FormSelect
      selectionMode="single"
      label={<Trans message="Default domain" />}
      description={
        <Trans message="Which domain should be used by default when shortening links." />
      }
      name="client.custom_domains.default_host"
      className="mb-24"
    >
      <Item key={0} value="" startIcon={<RemoteFavicon url={base_url} />}>
        {removeProtocol(base_url)}
      </Item>
      {domains.map(domain => (
        <Item
          value={domain.host}
          key={domain.id}
          startIcon={<RemoteFavicon url={domain.host} />}
        >
          {removeProtocol(domain.host)}
        </Item>
      ))}
    </FormSelect>
  );
}
